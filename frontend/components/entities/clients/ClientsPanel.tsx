import { Button, Spinner, TabPanel } from "@chakra-ui/react"
import ClientsList from "./ClientsList"
import axios from "axios";
import { env } from "~/env";
import { useQuery } from "@tanstack/react-query";
import MyModal from "../ui/modals/MyModal";
import ClientForm from "./ClientForm";

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
         <MyModal title="Nuevo cliente">
            <ClientForm />
         </MyModal> 
      </TabPanel>
   )
}

export default ClientsPanel