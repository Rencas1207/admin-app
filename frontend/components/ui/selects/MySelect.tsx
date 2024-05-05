import { useFormContext } from 'react-hook-form'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

interface Props<T> {
  fieldName: keyof T;
  label: string;
  options: readonly string[];
  showIf?: [keyof T, string]
}

function MySelect<T> ({ label, fieldName, options, showIf }: Props<T>) {
  const { formState: { errors }, register, watch } = useFormContext();

  let show = true
  if (showIf) {
    show = watch(showIf[0] as string) === showIf[1]
  }

  if (!show) return <></>

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