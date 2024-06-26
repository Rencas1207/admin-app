import { SearchIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form';
import { MyInputProps } from "schemas/UiSchemas"

function MyInput<T>({
   fieldName,
   label,
   placeholder,
   type = "text",
   valueAsNumber = false,
   valueAsDate = false,
   showLabel = true,
   mb = 5,
   size,
   flex = 4,
   searchFn = false,
   triggerUpdate = false,
   showIf,
}: MyInputProps<T>) {
   const {
   getValues,
   setValue,
   formState: { errors },
   register,
   watch,
   } = useFormContext()

   const handleSearch = () => {
    const fieldValue = getValues(fieldName as string)
    if (typeof searchFn === "function") {
      searchFn(fieldValue)
    }
  }

   const registerOptions = valueAsNumber ? { valueAsNumber } : { valueAsDate }

   const FinalInput = (
      <Input
         size={size}
         type={type}
         placeholder={placeholder || label}
         {...register(fieldName as string, registerOptions)}
         onChange={(e) => {
         register(fieldName as string, registerOptions).onChange(e)
         triggerUpdate && setValue("trigger_update", Math.random())
         }}
      />
   )

   if (type === "hidden") return FinalInput

   let show = typeof showIf === "boolean" ? showIf : true
   if (showIf && Array.isArray(showIf)) {
      show = watch(showIf[0] as string) === showIf[1]
   }

   if (!show) return <></>

   return (
      <FormControl isInvalid={!!errors[fieldName as string]} flex={flex} marginBottom={mb}>
         {showLabel && <FormLabel>{label}</FormLabel>}
        <Flex gap={2}>
            {searchFn && 
               <IconButton 
               aria-label='Search' 
               icon={<SearchIcon />} 
               onClick={handleSearch}
            />}
            {FinalInput}
         </Flex> 
         <FormErrorMessage>{errors[fieldName as string]?.message as ReactNode}</FormErrorMessage>
      </FormControl>
  )
}

export default MyInput