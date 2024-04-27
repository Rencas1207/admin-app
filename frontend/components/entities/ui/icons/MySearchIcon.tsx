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
         // onClick={}
      />
   )
}

export default MySearchIcon