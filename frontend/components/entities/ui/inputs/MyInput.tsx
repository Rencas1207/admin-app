import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form';

interface Props<T> {
   fieldName: keyof T;
   label: string;
   placeholder?: string;
   mb?: number;
   flex?: number;
}

function MyInput<T>({
   fieldName,
   label,
   placeholder,
   mb = 5,
   flex = 4
}: Props<T>) {
   const { register, formState: { errors } } = useFormContext();
   return (
      <FormControl isInvalid={!!errors[fieldName as string]} flex={flex} marginBottom={mb}>
         <FormLabel>{label}</FormLabel>
         <Input type='text' placeholder={placeholder || label} {...register(fieldName as string)} />
         <FormErrorMessage>{errors[fieldName as string]?.message as ReactNode}</FormErrorMessage>
      </FormControl>
  )
}

export default MyInput