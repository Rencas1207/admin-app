import { useFormContext } from "react-hook-form"
import { Flex, Text } from "@chakra-ui/react"
import MyInput from "../ui/inputs/MyInput"
import MySelect from "../ui/selects/MySelect"
import { PAYMENT_METHOD_TYPES, PaymentMethod, Sale, TIME_UNITS } from "schemas/SaleSchema"
import MyDeleteIcon from "../ui/icons/MyDeleteIcon"

interface Props {
   fieldName: keyof Sale;
}

const PaymentMethodAdder = ({fieldName}: Props) => {
   const { watch } = useFormContext();
   const paymentMethods = watch(fieldName)

   if(!paymentMethods || paymentMethods.length === 0) {
      return <Text mb={6}>No se ha agregado ningún método de pago.</Text>
   }

   return (
      <Flex flexDir="column" mb="4">
         {paymentMethods.map((_: PaymentMethod, index: number) => (
            <Flex key={index} gap={3} alignItems="center">
               <MySelect 
                  fieldName={`payment_methods.${index}.method`} 
                  label='Metódo' 
                  options={PAYMENT_METHOD_TYPES}                   
               />
               <MyInput 
                  fieldName={`payment_methods.${index}.amount`} 
                  label='Valor' 
                  flex={3}
                  valueAsNumber={true} 
                  showLabel={index === 0} 
                  mb={0} 
               />
               <MyInput 
                  fieldName={`payment_methods.${index}.time_value`} 
                  flex={1} 
                  mb={0} 
                  label='Plazo' 
                  valueAsNumber={true} 
                  showLabel={index === 0} 
               />
               <MySelect 
                  fieldName={`payment_methods.${index}.time_unit`} 
                  label='Periodo' 
                  options={Object.keys(TIME_UNITS.Enum)} 
               />
               <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
            </Flex>
         ))}  
      </Flex> 
   )
}

export default PaymentMethodAdder