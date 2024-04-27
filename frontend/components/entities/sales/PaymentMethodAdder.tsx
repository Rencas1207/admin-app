import { useFormContext } from "react-hook-form"
import { Flex } from "@chakra-ui/react"
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
   return (
      <Flex flexDir="column" mb="4">
         {paymentMethods.map((_: PaymentMethod, index: number) => (
            <Flex key={index} gap={3} alignItems="center">
               <MySelect 
                  fieldName={`payment_methods.${index}.method`} 
                  label='Metódo' 
                  options={PAYMENT_METHOD_TYPES}                   
               />
               {/* <FormControl flex={8} marginBottom={5}>
                  <FormLabel>Método</FormLabel>
                  <Select 
                     placeholder='Seleccionar'
                     {...register(`payment_methods.${index}.method`)} >
                     {
                        PAYMENT_METHOD_TYPES.map(method => (
                           <option key={method} value={method}>
                              {method}
                           </option>
                        ))
                     }
                  </Select>
               </FormControl> */}
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
               {/* <FormControl flex={8} marginBottom={5}>
                  <FormLabel>Periodo</FormLabel>
                  <Select 
                     placeholder='Seleccionar' 
                     {...register(`payment_methods.${index}.time_unit`)} 
                  >
                     {
                        Object.keys(TIME_UNITS.Enum).map(unit => (
                           <option key={unit} value={unit}>
                              {unit}
                           </option>
                        ))
                     }
                  </Select>
               </FormControl> */}
               <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
            </Flex>
         ))}  
      </Flex> 
   )
}

export default PaymentMethodAdder