import { Button, ButtonGroup, Card, Container, Heading, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import ClientsList from 'components/entities/clients/ClientsList';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { env } from '~/env';

const ClientPage: NextPage = () => {
   const router = useRouter();

   const {data: clients, isLoading} = useQuery({
      queryKey: ['clients'],
      queryFn: async () => {
        const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`, {
         withCredentials: true
        })
        return response.data.data;
      }
   });

  return (
    <Container mt={8}>
      <Card padding={4}>
         <Heading>Clientes</Heading>
         {
            isLoading ? <Spinner /> : <ClientsList clients={clients} /> 
         }
         <ButtonGroup>
            <Button mt={8} colorScheme='blue' onClick={() => {
               router.push('/clients/new')
            }}>
               Nuevo cliente
            </Button> 
            <Button mt={8} colorScheme='gray' onClick={() => {
               router.push('/')
            }}>
               Volver
            </Button> 
         </ButtonGroup>
      </Card>
    </Container>
  )
}

export default ClientPage