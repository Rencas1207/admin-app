import { TabPanel } from '@chakra-ui/react'
import ProductsList from './ProductsList'

const ProductsPanel = () => {
   return (
      <TabPanel>
         <ProductsList onClick={() => console.log('click')} />
      </TabPanel>
  )
}

export default ProductsPanel