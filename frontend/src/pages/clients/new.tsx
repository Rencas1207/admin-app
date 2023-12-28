import { Button, Card, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { NextPage } from 'next'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import React from 'react'

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

  return (
    <Container marginTop={8}>
      <Card padding={4}>
         <Heading textAlign="center" marginBottom={6}>Nuevo cliente</Heading>
         <form>
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