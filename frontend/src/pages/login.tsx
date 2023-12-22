import { NextPage } from 'next'
import { Container, FormControl, FormLabel, Heading, Input, Card, Button, ButtonGroup, FormErrorMessage } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { env } from '~/env';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
   email: z.string().email('Email inválido'),
   code: z.string().length(6, "El código debe tener 6 caracteres")
})

type FieldValues = z.infer<typeof schema> // infiere del schema

const Login: NextPage = () => {
   const { register, getValues, handleSubmit, formState: {errors} } = useForm<FieldValues>({
      resolver: zodResolver(schema),
      defaultValues: {
         email: 'rencasdag.12@gmail.com',
         code: '049118'
      }
   });
   const router = useRouter();

   const onSubmit = () => {
      const {email, code} = getValues();
      console.log({email, code});
      axios
         .post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, 
         { code },
         {withCredentials: true}
         )
         .then(() => {
            router.push('/');
         })
         .catch(console.log);
   }

  return (
    <Container marginTop={10} >
      <Card padding={3}>
         <Heading textAlign="center">Iniciar sesión</Heading>
         <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email} marginBottom={5}>
               <FormLabel>Email</FormLabel>
               <Input type='text' placeholder='Ingresa tu email' {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.code}>
               <FormLabel>Código</FormLabel>
               <Input type='number' placeholder='Ingresa tu código'  {...register('code')} />
               <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
            </FormControl>
            <ButtonGroup marginTop={8} justifyContent="space-between" w="100%">
               <Button type='submit' colorScheme='blue'>Iniciar sesión</Button>
               <Button colorScheme='blue' onClick={() => {
                  const email = getValues('email');
                  axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`)
               }}>Quiero un código</Button>
            </ButtonGroup>
         </form>
      </Card>
    </Container>
  )
}

export default Login