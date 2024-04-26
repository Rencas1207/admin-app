import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form';

interface Props<T> {
   fieldName: keyof T;
   label: string;
   type?: string;
   valueAsNumber?: boolean;
   showLabel?: boolean;
   placeholder?: string;
   mb?: number;
   flex?: number;
}

function MyInput<T>({
   fieldName,
   label,
   placeholder,
   type = "text",
   valueAsNumber = false,
   showLabel = true,
   mb = 5,
   flex = 4
}: Props<T>) {
   const { register, formState: { errors } } = useFormContext();
   return (
      <FormControl isInvalid={!!errors[fieldName as string]} flex={flex} marginBottom={mb}>
         {showLabel && <FormLabel>{label}</FormLabel>}
         <Input type={type} placeholder={placeholder || label} {...register(fieldName as string, {
            valueAsNumber
         })} />
         <FormErrorMessage>{errors[fieldName as string]?.message as ReactNode}</FormErrorMessage>
      </FormControl>
  )
}

export default MyInput