import { useRouter } from 'next/router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';
import { env } from '~/env';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import MyInput from '../ui/inputs/MyInput';

const DOC_TYPES = ["RUC", "Cédula", "Pasaporte", "Identificación Exterior"] as const;

const schema = z.object({
   firstname: z.string().min(3),
   lastname: z.string().min(3),
   email: z.string().email('Email inválido'),
   document_type: z.enum(DOC_TYPES),
   document_value: z.string().min(4),
})

export type Client = z.infer<typeof schema>

interface Props {
   clientId ?: string
}

const ClientForm = ({clientId}: Props) => {
   const router = useRouter();
   const { register, getValues, handleSubmit, control, reset, formState: {errors} } = useForm<Client>({
      resolver: zodResolver(schema),
      defaultValues: async () => {
         if(!clientId) return {}

         const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${clientId}`, {
            withCredentials: true
         }); 
         return data.data;
      }
   });

    const onSubmit = async (data: Client) => {
      const PARAMS = !!clientId ? `/${clientId}` : ''
      await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, 
         {
            method: !!clientId ? "PUT" : "POST",
            data,
            withCredentials: true
         },
      )
      reset();
      router.push('/clients')
   }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput fieldName='firstname' label='Nombre' />
            <FormControl isInvalid={!!errors.lastname} marginBottom={5}>
               <FormLabel>Apellido</FormLabel>
               <Input type='text' placeholder='Ingresa tu apellido' {...register('lastname')} />
               <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} marginBottom={5}>
               <FormLabel>Email</FormLabel>
               <Input type='text' placeholder='Ingresa tu email' {...register('email')} />
               <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Flex gap={3}>
               <FormControl flex={8} isInvalid={!!errors.document_type} marginBottom={5}>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select placeholder='Seleccionar' {...register('document_type')} >
                     {
                        DOC_TYPES.map(dt => (
                           <option key={dt} value={dt}>
                              {dt}
                           </option>
                        ))
                     }
                  </Select>
               </FormControl>
               <FormControl flex={5} isInvalid={!!errors.document_value} marginBottom={5}>
                  <FormLabel>Documento</FormLabel>
                  <Input type='text' placeholder='Documento' {...register('document_value')} />
                  <FormErrorMessage>{errors.document_value?.message}</FormErrorMessage>
               </FormControl>
            </Flex>
            <ButtonGroup>
               <Button colorScheme='purple' type='submit'>
                  {!!clientId ? 'Guardar cambios' : 'Crear'}
               </Button>
               <Button colorScheme='gray' type='submit' onClick={() => router.back()}>
                  Volver
               </Button>
            </ButtonGroup>
         </form>

          <DevTool control={control} /> {/* set up the dev tool */}
    </>
  )
}

export default ClientForm