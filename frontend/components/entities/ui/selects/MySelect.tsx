import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

interface Props<T> {
  fieldName: keyof T;
  label: string;
  options: readonly string[];
}

function MySelect<T> ({ label, fieldName, options }: Props<T>) {
  const { formState: { errors }, register } = useFormContext();
  return (
    <FormControl flex={3} isInvalid={!!errors.document_type}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder='Seleccionar' {...register(fieldName as string)} >
        {
          options.map(op => (
            <option key={op} value={op}>
                {op}
            </option>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default MySelect