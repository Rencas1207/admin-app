import { NextPage } from 'next'
import { Container, FormControl, FormLabel, Heading, Input, Card, Button, ButtonGroup, FormErrorMessage } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { env } from '~/env';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MyForm from 'components/entities/ui/forms/MyForm';
import MyInput from 'components/entities/ui/inputs/MyInput';
import LoginButtons from 'components/entities/users/LoginButtons';

const schema = z.object({
   email: z.string().email('Email inválido'),
   code: z.string().length(6, "El código debe tener 6 caracteres")
})

type FieldValues = z.infer<typeof schema> // infiere del schema

const Login: NextPage = () => {
   const { register, getValues, handleSubmit, formState: {errors} } = useForm<FieldValues>({
      resolver: zodResolver(schema),
   });
   const router = useRouter();

   const onError = (errors: unknown) => {
      console.log({errors});
   }

   const onSubmit = (data: FieldValues) => {
      const {email, code} = data;

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
         <MyForm defaultValues={{
            email: 'rencasdag.12@gmail.com',
            code: '612326'
         }} zodSchema={schema} onSubmit={onSubmit} onError={onError}> 
            <MyInput fieldName='email' label='Email' />
            <MyInput fieldName='code' label='Código' />
            <LoginButtons />
         </MyForm>
      </Card>
    </Container>
  )
}

export default Login