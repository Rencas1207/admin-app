import { useRef, useState } from 'react';
import { Button, Flex, Input, useModalContext } from '@chakra-ui/react'
import ProductsList from './ProductsList'
import { Search2Icon } from '@chakra-ui/icons';
import { ProductFromDB } from 'schemas/ProductSchema';
import { useFieldArray, useFormContext } from 'react-hook-form';
import calcProductPrice from 'helpers/calcProductPrice';

const ProductSearcher = () => {
  const { control } = useFormContext();
   const { append } = useFieldArray({
      control, 
      name: "products"
   })
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [selectedProducts, setSelectedProducts] = useState<ProductFromDB[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { onClose } = useModalContext();

  const handleClick = (product: ProductFromDB) => {
    console.log({product});
    const alreadyIncluded = selectedProducts.some(sp => sp._id === product._id)
    if(!alreadyIncluded) {
      setSelectedProducts([...selectedProducts, product])
    } else {
      setSelectedProducts(selectedProducts.filter(p => p._id !== product._id))
    }
  }

  const handleSelect = () => {
    for (const product of selectedProducts) {
      append({
        name: product.name,
        qty: 1,
        unit_price: calcProductPrice(product),
      })
    }
    onClose();
    console.log({selectedProducts});
  }
  
  return (
    <div>
      <Flex>
        <form onSubmit={() => setSearchText(inputRef?.current?.value)} style={{ width: '100%'}}>
          <Flex alignItems="center" gap={3}>
            <Input 
              flex={8}
              ref={inputRef}
              placeholder='Buscar por código o nombre...' 
            />
            <Button type='submit'>
              <Search2Icon flex={2} />
            </Button>
          </Flex>
        </form>
      </Flex>
      <ProductsList 
        searchText={searchText} 
        onClick={handleClick} 
        selectedProducts={selectedProducts} 
      />
      <Button colorScheme='purple' isDisabled={selectedProducts.length === 0} onClick={handleSelect}>Finalizar selección</Button>
    </div>
  )
}

export default ProductSearcher