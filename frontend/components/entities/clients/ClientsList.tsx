import axios from 'axios';
import { env } from '~/env';
import { useQuery } from '@tanstack/react-query';
import {  Flex, Spinner, Text } from '@chakra-ui/react'
import { ClientFromDB } from 'schemas/ClientSchema';
import ClientItem from './ClientItem';

interface Props {
   onClick: (client: ClientFromDB) => void
   selectedClientId: string | undefined;
}

const ClientsList = ({ onClick, selectedClientId }: Props) => {
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
                  <ClientItem 
                     key={c._id} 
                     client={c} 
                     onClick={onClick} 
                     selected={c._id === selectedClientId} 
                  />
               ))
            }
         </Flex>
      </>
   )
}

export default ClientsList