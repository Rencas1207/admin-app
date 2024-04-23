import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form';
import { string } from 'zod';

interface Props {
   fieldName: string;
   label: string;
   placeholder?: string;
   // register: any;
   // errors: any
}

const MyInput = ({
   label,
   fieldName,
   placeholder
}: Props) => {
   const { register, formState: { errors } } = useFormContext();
  return (
      <FormControl isInvalid={!!errors[fieldName]} marginBottom={5}>
         <FormLabel>{label}</FormLabel>
         <Input type='text' placeholder={placeholder || fieldName} {...register(fieldName)} />
         <FormErrorMessage>{errors[fieldName]?.message as ReactNode}</FormErrorMessage>
      </FormControl>
  )
}

export default MyInput