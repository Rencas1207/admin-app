import { Button, ButtonGroup, Spinner, TabPanel } from "@chakra-ui/react"
import ClientsList from "./ClientsList"
import axios from "axios";
import { env } from "~/env";
import { useQuery } from "@tanstack/react-query";

const ClientsPanel = () => {
   const {data: clients, isLoading} = useQuery({
      queryKey: ['clients'],
      queryFn: async () => {
        const response = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`, {
         withCredentials: true
        })
        return response.data.data;
      }
   });
   if (isLoading) return <Spinner />
   return (
      <TabPanel>
         <ClientsList clients={clients} />
         <ButtonGroup mt={8}>
            <Button colorScheme='purple' onClick={() => {}}>
               Nueva cliente
            </Button> 
         </ButtonGroup>
      </TabPanel>
   )
}

export default ClientsPanel