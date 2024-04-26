import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { Flex } from '@chakra-ui/react'
import MyInput from '../ui/inputs/MyInput'
import MyDeleteIcon from '../ui/icons/MyDeleteIcon'
import MySearchIcon from '../ui/icons/MySearchIcon'
import { Sale } from 'schemas/SaleSchema'
import { useEffect } from 'react'

interface Props {
   fieldName: keyof Sale;
}

function ProductAdder({fieldName}: Props) {
   const { getValues, setValue } = useFormContext();
   const { fields } = useFieldArray({ name: fieldName as string })
   const productsState = useWatch({
      name: fieldName
   })

   useEffect(() => {
      const currentProducts = getValues(fieldName);
      if(currentProducts.length > 0) {
         let amount = currentProducts.reduce((prev: any, curr: any) => prev + curr.qty * curr.unit_price, 0)
         // setTotalAmount(amount)
         setValue(`payment_methods.0.amount`, amount);
      }
   }, [productsState])

   return (
      <Flex flexDir="column" mb="4">
         {fields.map((field, index) => (
            <Flex key={field.id} gap={3} alignItems="flex-end" mb={5}>
               <MySearchIcon index={index} />
               <MyInput 
                  fieldName={`products.${index}.code`} 
                  flex={2} 
                  label='Código' 
                  showLabel={index === 0} 
               />
               <MyInput 
                  fieldName={`products.${index}.name`} 
                  flex={5} 
                  label='Denominación' 
                  showLabel={index === 0} 
               />
               <MyInput 
                  fieldName={`products.${index}.qty`} 
                  flex={1} 
                  label='Cantidad' 
                  showLabel={index === 0} 
                  type='number'
                  valueAsNumber={true}
               />
               <MyDeleteIcon<Sale> fieldName="products" index={index} />
            </Flex>
         ))}  
      </Flex> 
   )
}

export default ProductAdder