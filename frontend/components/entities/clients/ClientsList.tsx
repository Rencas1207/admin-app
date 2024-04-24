import { useRouter } from 'next/router'
import { Card, Flex, Text } from '@chakra-ui/react'
import { ClientListProps } from 'schemas/ClientSchema';

const ClientsList = ({ clients }: ClientListProps) => {
  const router = useRouter();
  return (
    <>
      <Flex flexDir="column" gap={2} mt={2}>
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