import { useFieldArray, useFormContext } from 'react-hook-form'
import { DeleteIcon } from '@chakra-ui/icons'

interface Props<T> {
   fieldName: keyof T;
   index: number;
}

function MyDeleteIcon<T>({fieldName, index}: Props<T>) {
   const { control } = useFormContext();
   const { remove: removeProduct } = useFieldArray({
      control,
      name: fieldName as string,
   })
  return (
   <DeleteIcon 
      color={"red.500"}
      _hover={{ color: "red.700", cursor: "pointer" }} 
      onClick={() => removeProduct(index)} 
   />    
  )
}

export default MyDeleteIcon