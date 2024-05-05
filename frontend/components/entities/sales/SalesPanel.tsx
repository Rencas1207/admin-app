import { TabPanel } from '@chakra-ui/react'
import SaleList from './SaleList'
import SaleForm from './SaleForm'
import MyModal from '../ui/modals/MyModal'

const SalesPanel = () => {
   return (
      <TabPanel>
         <SaleList  />
         <MyModal title="Nueva venta">
            <SaleForm />
         </MyModal> 
      </TabPanel>
  )
}

export default SalesPanel