import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { env } from '~/env';
import axios from 'axios';
import { defaultPM, defaultProduct, Sale, SaleFormProps, saleSchema, } from 'schemas/SaleSchema';
import MyForm from '../ui/forms/MyForm';
import MyInput from '../ui/inputs/MyInput';
import ProductAdder from './ProductAdder';
import PaymentMethodAdder from './PaymentMethodAdder';
import MyAdderButton from '../ui/buttons/MyAdderButton';
import SaleFormButtons from './SaleFormButtons';
import MyModal from '../ui/modals/MyModal';
import ProductSearcher from '../products/ProductSearcher';
import getDateForInput from 'helpers/getDateForInput';

const SaleForm = ({ saleId }: SaleFormProps) => {
   const router = useRouter();
   const [totalAmount, setTotalAmount] = useState(0);
   const [foundClient, setFoundClient] = useState<{_id: string, firstname: string} | null>(null);

   const onSubmit = async (data: Sale, reset: any) => {
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
            operation_date: getDateForInput(),
            // payment_methods: [defaultPM],
            // products: [defaultProduct]
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
            <MyInput<Sale> 
               fieldName='client_document' 
               label='Documento del cliente' 
               searchFn={async (document) => {
                  if(!document) return;
                  const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/document/${document}`, 
                     { withCredentials: true }
                  )  
                  setFoundClient(data.data)
               }}   
            />
            
         </Flex>
         {!!foundClient && (
            <Card mb={5} p={3}>
               <Text>{foundClient?.firstname}</Text>
            </Card>
         )}
          <MyInput<Sale> 
            fieldName='operation_date' 
            label='Fecha de la operación' 
            type='date'
            valueAsDate 
         />
         <Flex alignItems="center" justifyContent={"space-between"} mt={4}>
            <Heading size="md">Productos</Heading>
            {/* <MyAdderButton fieldName='products' /> */}
            <MyModal title='Elegir productos' buttonText='Agregar' buttonColor='blue'>
               <ProductSearcher />
            </MyModal>
         </Flex>
         <Divider mb={3} mt={2} />
         <ProductAdder fieldName="products" />
         <Flex alignItems="center" justifyContent={"space-between"} mt={4}>
            <Heading size="md">Forma de pago</Heading>
             <MyAdderButton fieldName='payment_methods' />
         </Flex>
         <Divider mb={3} mt={2} />
         <PaymentMethodAdder fieldName='payment_methods' />
         <SaleFormButtons saleId={saleId as string} />
      </MyForm>
    </>
  )
}

export default SaleForm