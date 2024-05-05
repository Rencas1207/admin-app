import { TabPanel } from '@chakra-ui/react'
import ProductsList from './ProductsList'

const ProductsPanel = () => {
   return (
      <TabPanel>
         <ProductsList />
      </TabPanel>
  )
}

export default ProductsPanel