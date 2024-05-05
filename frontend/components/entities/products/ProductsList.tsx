import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductFromDB } from "schemas/ProductSchema";
import { env } from "~/env";

interface Props {
   searchText?: string | undefined
   onClick: (product: ProductFromDB) => void
}
const ProductsList = ({searchText, onClick}: Props) => {
   const PARAMS = !!searchText ? `?searchText=${searchText}` : ''

  const {data: products, isLoading} = useQuery<ProductFromDB[]>({
    queryKey: ['products', searchText],
    queryFn: async () => {
      const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products${PARAMS}`, {
      withCredentials: true
      })
      return response.data.data;
    }
  });

  if (isLoading) return <Spinner />
  if (!products) return <Text mb={6}>No hay productos para mostrar.</Text>

  return (
     <Flex flexDir="column" gap={2} mt={2} maxH="40vh" overflowY="scroll" mb={4}>
         {products.map(p => (
               <Card
                  key={p._id} 
                  px={3}
                  py={4} 
                  cursor="pointer" 
                  _hover={{ bg: "gray.200", color: "#222", transition: "0.2s background-color ease-out, 0.2s color ease-out" }}
                  onClick={() => onClick(p)}
                  flexDir={"row"}
                  justifyContent={"space-between"}
               >
                  <Text>{p.name}</Text>
                  <Text>$ {p.supplier_cost || 0}</Text>
               </Card>
            ))
         }
      </Flex>
  )
}

export default ProductsList