import { NextPage } from 'next'
import { Container, FormControl, FormLabel, Heading, Input, Card, Button, ButtonGroup } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { env } from '~/env';
import { useRouter } from 'next/router';


const Login: NextPage = () => {
   const { register, getValues } = useForm();
   const router = useRouter();

  return (
    <Container marginTop={10} >
      <Card padding={3}>
         <Heading textAlign="center">Iniciar sesión</Heading>
         <form>
            <FormControl marginBottom={5}>
               <FormLabel>Email</FormLabel>
               <Input type='text' placeholder='Ingresa tu email' {...register('email')} />
            </FormControl>
            <FormControl>
               <FormLabel>Código</FormLabel>
               <Input type='text' placeholder='Ingresa tu código'  {...register('code')} />
            </FormControl>
            <ButtonGroup marginTop={8} justifyContent="space-between" w="100%">
               <Button colorScheme='blue' onClick={() => {
                    const {email, code} = getValues();
                     axios
                        .post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, 
                        { code }
                        )
                        .then(({data}) => {
                           router.push('/');
                        })
                        .catch(console.log);

               }}>Iniciar sesión</Button>
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