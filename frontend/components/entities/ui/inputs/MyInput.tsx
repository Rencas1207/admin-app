import { SearchIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form';
import { MyInputsProps } from 'schemas/UiSchemas';

function MyInput<T>({
   fieldName,
   label,
   placeholder,
   type = "text",
   valueAsNumber = false,
   valueAsDate = false,
   showLabel = true,
   mb = 5,
   flex = 4,
   searchFn = false
}: MyInputsProps<T>) {
   const { register, getValues, formState: { errors } } = useFormContext();
   const handleSearch = () => {
      const fieldValue = getValues(fieldName as string);
      if(typeof searchFn === "function") {
         searchFn(fieldValue)
      }
   }

   const registerOptions = valueAsNumber ? { valueAsNumber } : { valueAsDate }
   return (
      <FormControl isInvalid={!!errors[fieldName as string]} flex={flex} marginBottom={mb}>
         {showLabel && <FormLabel>{label}</FormLabel>}
        <Flex gap={2}>
         {searchFn && <IconButton 
            aria-label='Search' 
            icon={<SearchIcon />} 
            onClick={handleSearch}
         />}
         <Input 
            type={type} 
            placeholder={placeholder || label} 
            {...register(fieldName as string, registerOptions)} 
         />
         </Flex> 
        
         <FormErrorMessage>{errors[fieldName as string]?.message as ReactNode}</FormErrorMessage>
      </FormControl>
  )
}

export default MyInput