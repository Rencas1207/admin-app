import { NextPage } from 'next'
import { Container, Heading, Card } from '@chakra-ui/react'
import axios from 'axios';
import { env } from '~/env';
import { useRouter } from 'next/router';
import MyForm from 'components/ui/forms/MyForm';
import MyInput from 'components/ui/inputs/MyInput';
import LoginButtons from 'components/entities/users/LoginButtons';
import { LoginSchema, LoginType } from 'schemas/AuthSchema';
import useAuth from 'hooks/useAuth';

const Login: NextPage = () => {
   const { setUser } = useAuth();
   const router = useRouter();

   const onError = (errors: unknown) => {
      console.log({errors});
   }

   const onSubmit = (data: LoginType) => {
      const {email, code} = data;

      axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, 
         { code },
         {withCredentials: true}
         )
         .then(({data}) => {
            const tokenPayload = data.data
            localStorage.setItem('user', JSON.stringify(tokenPayload))
            setUser(tokenPayload)
            router.push('/');
         })
         .catch(console.log);
   }

  return (
    <Container marginTop={10} >
      <Card padding={3}>
         <Heading textAlign="center">Iniciar sesión</Heading>
         <MyForm 
            defaultValues={{
               email: 'rencasdag.12@gmail.com',
               code: '021054'
            }} 
            zodSchema={LoginSchema} 
            onSubmit={onSubmit} 
            onError={onError}
         > 
            <MyInput fieldName='email' label='Email' />
            <MyInput fieldName='code' label='Código' />
            <LoginButtons />
         </MyForm>
      </Card>
    </Container>
  )
}

export default Login