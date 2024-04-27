import { Button } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PaymentMethod, Sale, ProductForState } from 'schemas/SaleSchema'


interface DefaultValues {
   [key: string]: PaymentMethod | ProductForState
} 

const DEFAULT_VALUES: DefaultValues = {
   payment_methods: {
      method: "Sin utilización Sist. Financiero",
      amount: 0,
      time_unit: "Meses",
      time_value: 0
   },
   products: {
      code: "",
      name: "",
      qty: 0,
      unit_price: 0
   }
} as const

interface Props {
   fieldName: keyof Sale
}

const MyAdderButton = ({fieldName}: Props) => {
   const { control } = useFormContext();
   const { append } = useFieldArray({
      control, 
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