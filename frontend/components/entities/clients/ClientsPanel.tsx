import { TabPanel } from "@chakra-ui/react"
import ClientsList from "./ClientsList"
import MyModal from "../ui/modals/MyModal";
import ClientForm from "./ClientForm";
import SaleForm from "../sales/SaleForm";
import { useState } from "react";
import { ClientFromDB } from "schemas/ClientSchema";

const ClientsPanel = () => {
   const [selectedClient, setSelectedClient] = useState<ClientFromDB | null>();
   const handleClick = (c: ClientFromDB) => {
      const valueToSet = c._id === selectedClient?._id ? null : c
      setSelectedClient(valueToSet)
   }
   return (
      <TabPanel>
         <ClientsList onClick={handleClick} selectedClientId={selectedClient?._id} />         
         <MyModal title="Nuevo cliente" mr={3}>
            <ClientForm />
         </MyModal> 
         <MyModal title="Nueva venta" buttonColor="green" disableButton={!selectedClient}>
            <SaleForm />
         </MyModal> 
      </TabPanel>
   )
}

export default ClientsPanel