import { Card, Text } from "@chakra-ui/react"
import { ClientFromDB } from "schemas/ClientSchema";

interface Props {
   client: ClientFromDB
   onClick: (client: ClientFromDB) => void
   selected?: boolean;
}

const ClientItem = ({client, onClick, selected}: Props) => {
  return (
    <Card
      key={client._id} 
      px={3}
      py={4} 
      cursor="pointer" 
      bg={selected ? "blue.500" : "white"}
      color={selected ? "white" : "black"}
      _hover={selected ? {} : { bg: "gray.200", color: "#222", transition: "0.2s background-color ease-out, 0.2s color ease-out" }}
      onClick={() => onClick(client)}
      flexDir={"row"}
      justifyContent={"space-between"}
   >
      <Text>{client.firstname}</Text>
      <Text>$ {client.sales?.amount.toFixed(2) || 0}</Text>
   </Card>
  )
}

export default ClientItem