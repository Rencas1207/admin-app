import { TabPanel } from "@chakra-ui/react"
import ClientsList from "./ClientsList"
import MyModal from "../ui/modals/MyModal";
import ClientForm from "./ClientForm";

const ClientsPanel = () => {
   return (
      <TabPanel>
         <ClientsList />         
         <MyModal title="Nuevo cliente">
            <ClientForm />
         </MyModal> 
      </TabPanel>
   )
}

export default ClientsPanel