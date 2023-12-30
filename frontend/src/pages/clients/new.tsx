import { Button, Card, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select } from '@chakra-ui/react'
import { NextPage } from 'next'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import React from 'react'
import axios from 'axios';
import { env } from '~/env';

const NewClient: NextPage = () => {

   const DOC_TYPES = ["RUC", "Cédula", "Pasaporte", "Identificación Exterior"] as const;

   const schema = z.object({
      firstname: z.string().min(3),
      lastname: z.string().min(3),
      email: z.string().email('Email inválido'),
      document_type: z.enum(DOC_TYPES),
      document_value: z.string().min(4),
   })

   type FieldValues = z.infer<typeof schema>

   const { register, getValues, handleSubmit, control, formState: {errors} } = useForm<FieldValues>({
      resolver: zodResolver(schema),
   });

   const onSubmit = async (data: FieldValues) => {
      const response = await axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`, 
         data, 
         {withCredentials: true}
      )
      console.log(response);
   }

  return (
    <Container marginTop={8}>
      <Card padding={4}>
         <Heading textAlign="center" marginBottom={6}>Nuevo cliente</Heading>
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.firstname} marginBottom={5}>
               <FormLabel>Nombre</FormLabel>
               <Input type='text' placeholder='Ingresa tu nombre' {...register('firstname')} />
               <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
            </FormControl>
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
            <Button colorScheme='purple' type='submit'>
               Crear
            </Button>
         </form>

         <DevTool control={control} /> {/* set up the dev tool */}
      </Card>
    </Container>
  )
}

export default NewClient