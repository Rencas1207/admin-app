import { useRouter } from 'next/router'
import axios from 'axios';
import { env } from '~/env';
import { useQuery } from '@tanstack/react-query';
import { Card, Flex, Spinner, Text } from '@chakra-ui/react'
import { ClientFromDB } from 'schemas/ClientSchema';

const ClientsList = () => {
  const router = useRouter();
  const {data: clients, isLoading} = useQuery<ClientFromDB[]>({
      queryKey: ['clients'],
      queryFn: async () => {
        const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`, {
         withCredentials: true
        })
        return response.data.data;
      }
   });

   if (isLoading) return <Spinner />
   if (!clients) return <Text mb={6}>No hay clientes para mostrar.</Text>
  return (
    <>
      <Flex flexDir="column" gap={2} mt={2} maxH="40vh" overflowY="scroll" mb={4}>
         {
         clients
            .sort((a,b) => (b.sales?.amount || 0) - (a.sales?.amount || 0))
            .map(c => (
               <Card 
                  key={c._id} 
                  px={3}
                  py={4} 
                  cursor="pointer" 
                  _hover={{ bg: "gray.200", color: "#222", transition: "0.2s background-color ease-out, 0.2s color ease-out" }}
                  onClick={() => router.push(`/clients/${c._id}`)}
                  flexDir={"row"}
                  justifyContent={"space-between"}
               >
                  <Text>{c.firstname}</Text>
                  <Text>$ {c.sales?.amount.toFixed(2) || 0}</Text>
               </Card>
            ))
         }
      </Flex>
    </>
  )
}

export default ClientsList