import { useRouter } from 'next/router'
import { Card, Flex, Spinner, Text } from '@chakra-ui/react'
import { Sale } from 'schemas/SaleSchema';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { env } from '~/env';

interface SaleFromDB {
   _id: string;
   total_amount: number;
   client: string;
}

const SaleList = () => {
  const router = useRouter();

   const {data: sales, isLoading} = useQuery<SaleFromDB[]>({
      queryKey: ['sales'],
      queryFn: async () => {
         const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales`, {
         withCredentials: true
         })
         return response.data.data;
      }
   });

    if (isLoading) return <Spinner />
    if (!sales) return <Text mb={6}>No hay ventas para mostrar.</Text>

  return (
    <>
      <Flex flexDir="column" padding="1" gap={2} mt={2} maxH="40vh" overflowY="scroll" mb={4}>
         {
         sales
            .sort((a,b) => (b?.total_amount || 0) - (a?.total_amount || 0))
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
                  <Text>{c.client}</Text>
                  <Text>$ {c.total_amount.toFixed(2) || 0}</Text>
               </Card>
            ))
         }
      </Flex>
    </>
  )
}

export default SaleList;