import { Flex, Heading, useToast } from '@chakra-ui/react';
import { env } from '~/env';
import axios, { AxiosResponse } from 'axios';
import { Sale, SaleFormProps, SaleFromDB, saleSchema, } from 'schemas/SaleSchema';
import ProductAdder from '../products/ProductAdder';
import SaleFormButtons from './SaleFormButtons';
import ProductSearcher from '../products/ProductSearcher';
import getDateForInput from 'helpers/getDateForInput';
import MyForm from 'components/ui/forms/MyForm';
import MyModal from 'components/ui/modals/MyModal';
import PaymentMethodAdder from '../payment_methods/PaymentMethodAdder';
import { ApiResponse } from 'schemas/ApiSchema';
import SaleFormUpdater from './SaleFormUpdater';
import MyInput from 'components/ui/inputs/MyInput';
import PaymentMethodForm from '../payment_methods/PaymentMethodForm';
import ProductsSubtotal from '../products/ProductsSubtotal';

const SaleForm = ({ 
   saleId, 
   clientId,
   refetch,
   onClose,
   comissions,
   clientSalesCount 
}: SaleFormProps) => {
   const toast = useToast()
   const onSubmit = async (data: Sale, reset: any): Promise<void> => {
    if (!clientId) return
    const PARAMS = !!saleId ? `/${saleId}` : ""
    try {
      await axios<any, AxiosResponse<ApiResponse<SaleFromDB>>>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
        {
          method: !!saleId ? "PUT" : "POST",
          data: { ...data, client: clientId, comissions },
          withCredentials: true,
        }
      )
      refetch && refetch()
      reset()
      onClose && onClose()
    } catch (error: any) {
      toast({ title: error.response.data.message, status: "warning" })
    }
  }
   
   const onError = (errors: unknown) => {
      console.log({ errors });   
   }

   const setDefaultValues = async () => {
      if(!saleId) {    
         return { 
            operation_date: getDateForInput(),
            subtotal: 0,
            totalIva: 0,
            discounts: 0,
            products: [],
            payment_methods: [],
         }
      } 
         
      const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${saleId}`, {
         withCredentials: true
      }); 
      return {
         ...data.data,
         trigger_update: Math.random(), // Para que calcule al editar
         operation_date: getDateForInput(data?.data?.operation_date),
      }
   }

  return (
    <>
      <MyForm
         onError={onError} 
         onSubmit={onSubmit} 
         zodSchema={saleSchema} 
         defaultValues={setDefaultValues}
      >  
         <SaleFormUpdater />
         <MyInput type="hidden" fieldName="subtotal" label="" valueAsNumber />
         <MyInput type="hidden" fieldName="iva" label="" valueAsNumber />
         <MyInput type="hidden" fieldName="discounts" label="" valueAsNumber />
          <Flex alignItems="center" justifyContent={"space-between"} mb={3}>
            <Heading size="lg" m={0}>
               Productos
            </Heading>
            {!saleId && (
               <MyModal title="Elegir productos" buttonText="Agregar">
               {() => <ProductSearcher />}
               </MyModal>
            )}
         </Flex>
         <ProductAdder canRemove={!saleId} />
         <ProductsSubtotal comissions={comissions} />
         <Flex
            alignItems="center"
            justifyContent={"space-between"}
            mt="8"
            mb={3}
         >
            <Heading size="lg" m={0}>
               Forma de pago
            </Heading>
            {!saleId && (
               <MyModal
               title="Elegir medio de pago"
               buttonText="Agregar"
               >
               {({ onClose }) => (
                  <PaymentMethodForm onClose={onClose} comissions={comissions} />
               )}
               </MyModal>
            )}
         </Flex>
          <PaymentMethodAdder
            fieldName="payment_methods"
            canRemove={!saleId}
            comissions={comissions}
         />
          <MyInput<Sale>
            fieldName="referalDoc"
            label="Referido por"
            placeholder="Documento referente..."
            showIf={clientSalesCount === 0}
         />
         <SaleFormButtons
            saleId={saleId}
            onClose={onClose}
            comissions={comissions}
         />
      </MyForm>
    </>
  )
}

export default SaleForm