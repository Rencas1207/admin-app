import { useRef, useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react'
import ProductsList from './ProductsList'
import { Search2Icon } from '@chakra-ui/icons';
import { ProductFromDB } from 'schemas/ProductSchema';

const ProductSearcher = () => {
  const [searchText, setSearchText] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (product: ProductFromDB) => {
    console.log({product});
  }
  
  return (
    <div>
      <Flex >
        <form onSubmit={() => setSearchText(inputRef?.current?.value)}>
          <Flex alignItems="center" gap={3}>
            <Input 
              flex={8}
              ref={inputRef}
              placeholder='Buscar por código o nombre...' 
            />
            <Button type='submit'>
              <Search2Icon flex={1} />
            </Button>
          </Flex>
        </form>
      </Flex>
      <ProductsList searchText={searchText} onClick={handleClick} />
    </div>
  )
}

export default ProductSearcher