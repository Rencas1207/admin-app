import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, ButtonGroup, Flex, useDisclosure, useModalContext } from '@chakra-ui/react';
import { env } from '~/env';
import MyInput from '../ui/inputs/MyInput';
import MyForm from '../ui/forms/MyForm';
import MySelect from '../ui/selects/MySelect';
import { Client, ClientFormProps, ClientSchema, DOC_TYPES } from 'schemas/ClientSchema';

const ClientForm = ({clientId}: ClientFormProps) => {
   const { onClose } = useModalContext();

   const setDefaultValues = async () => {
      if(!clientId) return {}

      const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${clientId}`, {
         withCredentials: true
      }); 

      return data.data;
   }

   const onSubmit = async (data: Client, reset: any) => {
      const PARAMS = !!clientId ? `/${clientId}` : ''
      await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, 
         {
            method: !!clientId ? "PUT" : "POST",
            data,
            withCredentials: true
         },
      )
      reset();
      onClose();
   }

   const onError = (errors: unknown) => {
      console.log({ errors });   
   }

  return (
   <MyForm 
      onSubmit={onSubmit} 
      onError={onError} 
      zodSchema={ClientSchema} 
      defaultValues={setDefaultValues}
   >
      <MyInput<Client> fieldName='firstname' label='Nombre' />
      <MyInput<Client> fieldName='lastname' label='Apellido' />
      <MyInput<Client> fieldName='email' label='Email' />
      <Flex gap={3} mb={5}>
         <MySelect<Client> options={DOC_TYPES} fieldName='document_type' label='Tipo de documento'  />
         <MyInput<Client> fieldName='document_value' label='Documento' mb={0} />
      </Flex>     
      <Button colorScheme='purple' type='submit' mb={2}>
         {!!clientId ? 'Guardar cambios' : 'Crear'}
      </Button>
   </MyForm>
  )
}

export default ClientForm