import { useState } from 'react';
import { useRouter } from 'next/router';
import { Divider, Flex, Heading } from '@chakra-ui/react';
import { env } from '~/env';
import axios from 'axios';
import { Sale, SaleFormProps, saleSchema, } from 'schemas/SaleSchema';
import ProductAdder from './ProductAdder';
import PaymentMethodAdder from './PaymentMethodAdder';
import SaleFormButtons from './SaleFormButtons';
import ProductSearcher from '../products/ProductSearcher';
import getDateForInput from 'helpers/getDateForInput';
import MyForm from 'components/ui/forms/MyForm';
import MyAdderButton from 'components/ui/buttons/MyAdderButton';
import MyModal from 'components/ui/modals/MyModal';

const SaleForm = ({ saleId }: SaleFormProps) => {
   const router = useRouter();
   const [totalAmount, setTotalAmount] = useState(0);
   const [foundClient, setFoundClient] = useState<{_id: string, firstname: string} | null>(null);

   const onSubmit = async (data: Sale, reset: any) => {
   if(!foundClient) return;
   const PARAMS = !!saleId ? `/${saleId}` : ''
   await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`, 
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
         <Flex alignItems="center" justifyContent={"space-between"}>
            <Heading size="md">Productos</Heading>
            <MyModal title='Elegir productos' buttonText='Agregar' buttonColor='blue'>
                {() => <ProductSearcher />}
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