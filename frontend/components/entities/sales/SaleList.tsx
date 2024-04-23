import { Card, Flex, Text } from '@chakra-ui/react'
import { Sale } from './SaleForm'
import { useRouter } from 'next/router'

interface SaleFromDB extends Sale {
   _id: string;
   total_amount: number;
   client: string;
}

interface Props {
   sales: SaleFromDB[]
}

const SaleList = ({sales}: Props) => {
  const router = useRouter();
  return (
    <>
      <Flex flexDir="column" gap={2} mt={2}>
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