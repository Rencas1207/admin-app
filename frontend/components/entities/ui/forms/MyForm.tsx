import React, { ReactNode } from 'react'
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues, FormProvider, FieldValues } from 'react-hook-form';
import { AnyZodObject, z } from 'zod';

interface Props {
   defaultValues: DefaultValues<FieldValues>
   zodSchema: AnyZodObject
   onSubmit: (data: any) => void
   onError: (data: FieldValues) => void
   children: ReactNode
}

const MyForm = ({defaultValues, zodSchema, onSubmit, onError, children}: Props) => {
   type EntityType = z.infer<typeof zodSchema>
   const methods = useForm<EntityType>({
      resolver: zodResolver(zodSchema),
      defaultValues
   });

  return (
   <>
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            {children}
         </form>
      </FormProvider>
      <DevTool control={methods.control} />
   </>
   
  )
}

export default MyForm