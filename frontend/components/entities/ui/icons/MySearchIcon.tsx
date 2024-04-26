import axios from 'axios';
import { env } from '~/env';
import { IconButton, useToast } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useFormContext } from 'react-hook-form';
import { Product } from 'schemas/SaleSchema';

interface Props{
  index: number;  
}

const MySearchIcon = ({ index }: Props) => {
   const { getValues, setValue } = useFormContext() 
   const toast = useToast();
   return (
      <IconButton 
         aria-label='Search' 
         icon={<SearchIcon />} 
         onClick={async () => {
            const code = getValues(`products.${index}.code`);
            
            if(!code) return;

            const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`, 
               { withCredentials: true }
            )

            const product: Product = data.data;

            const {supplier_cost, micro, iva, profit_margin, salvament_margin} = product;
            const ivaAmount = iva * supplier_cost
            const baseCost = micro + supplier_cost
            const minimumCost = baseCost / (1 - salvament_margin)
            const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3);

            if(!!product) {
               setValue(`products.${index}`, {
                  code,
                  name: product.name,
                  qty: 1,
                  unit_price: finalPrice
               })
            } else {
               toast({
                     title: 'Producto',
                  description: "No se pudo encontrar el producto",
                  status: 'error',
                  isClosable: true,
                  position: 'top'
               })
            }
         }}
      />
   )
}

export default MySearchIcon