import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Flex, Text, useToast } from '@chakra-ui/react'
import MyInput from 'components/ui/inputs/MyInput'
import MyDeleteIcon from 'components/ui/icons/MyDeleteIcon'
import { Product,  Sale } from 'schemas/SaleSchema'

interface Props {
   fieldName: keyof Sale;
}

function ProductAdder({fieldName}: Props) {
   const toast = useToast();
   const { setValue, watch } = useFormContext();
   const products = watch("products");
   // const productsState = useWatch({
   //    name: fieldName
   // })

   useEffect(() => {
      // const currentProducts = getValues(fieldName);
      if(products?.length > 0) {
         let amount = products.reduce((prev: any, curr: any) => prev + curr.qty * curr.unit_price, 0)
         // setTotalAmount(amount)
         setValue(`payment_methods.0.amount`, amount);
      }
   }, [products])

    if(!products || products.length === 0) {
      return <Text mb={6}>No se ha agregado ningún producto.</Text>
   }


   return (
      <Flex flexDir="column">
         {products.map((product: Product, index: number) => (
            <Flex key={index} gap={3} alignItems="center" justifyContent={"space-between"} mb={5} w="100%"> 
               {/* <MyInput 
                  fieldName={`products.${index}.code`} 
                  flex={2} 
                  label='Código' 
                  showLabel={index === 0}
                  searchFn={async (code) => {
                     if(!code) return;

                     const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`, 
                        { withCredentials: true }
                     )

                     const product: Product = data.data;

                     const {supplier_cost, micro, iva, profit_margin, salvament_margin} = product;
                     const ivaAmount = iva * supplier_cost
                     const baseCost = micro + supplier_cost
                     const minimumCost = baseCost / (1 - salvament_margin)
                     const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3);

                     if(!!product) {
                        setValue(`products.${index}`, {
                           code,
                           name: product.name,
                           qty: 1,
                           unit_price: finalPrice
                        })
                     } else {
                        toast({
                           title: 'Producto',
                           description: "No se pudo encontrar el producto",
                           status: 'error',
                           isClosable: true,
                           position: 'top'
                        })
                     }
                  }} 
               /> */}
               {/* <MyInput 
                  fieldName={`products.${index}.name`} 
                  flex={4} 
                  label='Denominación' 
                  showLabel={index === 0} 
               /> */}
               <Text flex={8}>{product.name}</Text>
               <Flex alignItems="center" gap={3} flex={3}>
                  <MyInput 
                  fieldName={`products.${index}.qty`} 
                  // flex={1} 
                  label='Cantidad' 
                  showLabel={false} 
                  type='number'
                  valueAsNumber={true}
                  mb={0}
               />
               <MyDeleteIcon<Sale> fieldName="products" index={index} />
               </Flex>
            </Flex>
         ))}  
      </Flex> 
   )
}

export default ProductAdder