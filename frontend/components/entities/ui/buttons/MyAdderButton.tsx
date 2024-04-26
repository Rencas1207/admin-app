import { Button } from '@chakra-ui/react'
import { DEFAULT_VALUES } from 'constants'
import { useFieldArray } from 'react-hook-form'
import { Sale } from 'schemas/SaleSchema'

interface Props {
   fieldName: keyof Sale
}

const MyAdderButton = ({fieldName}: Props) => {
   const { append } = useFieldArray({
      name: fieldName
   })
   const defaultValues = DEFAULT_VALUES[fieldName]
   return (
      <Button 
         size="md" 
         lineHeight="1rem" 
         py={4} 
         colorScheme='blue'
         onClick={() => append(defaultValues)}
         >
         Agregar
      </Button>
  )
}

export default MyAdderButton