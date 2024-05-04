import { useRouter } from 'next/router'
import axios from 'axios'
import { env } from '~/env'
import { useQuery } from '@tanstack/react-query'
import { Button, ButtonGroup, Heading, Spinner, TabPanel } from '@chakra-ui/react'
import SaleList from './SaleList'

const SalesPanel = () => {
   const router = useRouter();
   const {data: sales, isLoading} = useQuery({
      queryKey: ['sales'],
      queryFn: async () => {
         const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales`, {
         withCredentials: true
         })
         return response.data.data;
      }
   });
   if (isLoading) return <Spinner />
   return (
      <TabPanel>
         <Heading>Mis ventas</Heading>
         <SaleList sales={sales} />
         <ButtonGroup mt={8}>
         <Button colorScheme='purple' onClick={() => {}}>
            Nueva venta
         </Button> 
         </ButtonGroup>
      </TabPanel>
  )
}

export default SalesPanel