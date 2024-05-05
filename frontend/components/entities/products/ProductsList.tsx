import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductFromDB } from "schemas/ProductSchema";
import { env } from "~/env";
import ProductItem from "./ProductItem";

interface Props {
   searchText?: string | undefined
   onClick: (product: ProductFromDB) => void
   selectedProducts?: ProductFromDB[]
}
const ProductsList = ({searchText, onClick, selectedProducts}: Props) => {
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
               <ProductItem 
                  key={p._id}
                  product={p}
                  onClick={onClick}
                  selected={selectedProducts?.includes(p)}
               />
            ))
         }
      </Flex>
  )
}

export default ProductsList