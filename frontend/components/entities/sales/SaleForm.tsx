import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFieldArray, useWatch } from 'react-hook-form'
import { Button, ButtonGroup, Card, Divider, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { env } from '~/env';
import axios from 'axios';
import { SearchIcon } from '@chakra-ui/icons';
import { defaultPM, defaultProduct, Sale, SaleFormProps, saleSchema, } from 'schemas/SaleSchema';
import MyForm from '../ui/forms/MyForm';
import MyInput from '../ui/inputs/MyInput';
import ProductAdder from './ProductAdder';
import PaymentMethodAdder from './PaymentMethodAdder';

const SaleForm = ({ saleId }: SaleFormProps) => {
   const router = useRouter();
   const [totalAmount, setTotalAmount] = useState(0);
   const [foundClient, setFoundClient] = useState<{_id: string, firstname: string} | null>(null);

   // const { register, setValue, getValues, handleSubmit, control, reset, formState: {errors, isLoading} } = useForm<Sale>({
   //    resolver: zodResolver(saleSchema),
   //    defaultValues,
   // });

   const productsState = useWatch({
      name: 'products'
   })

   const { fields, append, remove } = useFieldArray({
      name: 'payment_methods'
   })

   const { fields: products, append: addProduct, remove: removeProduct } = useFieldArray({
      name: 'products'
   })

    const onSubmit = async (data: Sale) => {
      if(!foundClient) return;
      const PARAMS = !!saleId ? `/${saleId}` : ''
      const res = await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`, 
         {
            method: !!saleId ? "PUT" : "POST",
            data: {
               ...data, 
               client: foundClient._id,
               total_amount: totalAmount
            },
            withCredentials: true
         },
      )
      reset();
      router.push('/')
   }
   
   

   const onError = (errors: unknown) => {
      console.log({ errors });   
   }

   const setDefaultValues = async () => {
      if(!saleId) {
         
         return { 
            operation_date: new Date(),
            payment_methods: [defaultPM],
            products: [defaultProduct]
         }
      } 
         
      const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${saleId}`, {
         withCredentials: true
      }); 
      return data.data;
   }

  return (
    <>
      <MyForm 
         onError={onError} 
         onSubmit={onSubmit} 
         zodSchema={saleSchema} 
         defaultValues={setDefaultValues}
      >
         <Flex gap={3}>
            <MyInput<Sale> fieldName='client_document' label='Documento del cliente' />
            <IconButton 
               aria-label='Search' 
               icon={<SearchIcon />} 
               onClick={async () => {
                  const document = getValues('client_document');
                  
                  if(!document) return;

                  const { data } = await axios.get(`${env.           NEXT_PUBLIC_BACKEND_BASE_URL}/clients/document/${document}`, 
                     { withCredentials: true }
                  )
                  setFoundClient(data.data)
               }}
            />
         </Flex>
         {!!foundClient && (
            <Card mt={3} p={3}>
               <Text>{foundClient?.firstname}</Text>
            </Card>
         )}
          <MyInput<Sale> fieldName='operation_date' label='Fecha de la operación' type='date' />
         <Flex alignItems="center" justifyContent={"space-between"} mt={8}>
            <Heading size="md">Productos</Heading>
            <Button 
               size="md" 
               lineHeight="1rem" 
               py={4} 
               colorScheme='blue'
               onClick={() => addProduct(defaultProduct)}
               >
               Agregar
            </Button>
         </Flex>
         <Divider mb={3} mt={2} />
         <ProductAdder fieldName="products" />
         <Flex alignItems="center" justifyContent={"space-between"} mt={8}>
            <Heading size="md">Forma de pago</Heading>
            <Button 
               size="md" 
               lineHeight="1rem" 
               py={4} 
               colorScheme='blue'
               onClick={() => append(defaultPM)}
               >
               Agregar
            </Button>
         </Flex>
         <Divider mb={3} mt={2} />
         <PaymentMethodAdder fieldName='payment_methods' />
         <ButtonGroup>
            <Button colorScheme='purple' type='submit'>
               {!!saleId ? 'Guardar cambios' : 'Crear'}
            </Button>
            <Button colorScheme='gray' type='submit' onClick={() => router.back()}>
               Volver
            </Button>
         </ButtonGroup>
      </MyForm>
    </>
  )
}

export default SaleForm