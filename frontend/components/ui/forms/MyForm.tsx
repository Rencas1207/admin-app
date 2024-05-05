import React, { ReactNode } from 'react'
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues, FormProvider, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { Flex, Spinner } from '@chakra-ui/react';

interface Props {
   zodSchema: z.Schema
   onSubmit: (data: any, reset: any) => void
   onError: (data: FieldValues) => void
   children: ReactNode
   defaultValues?: DefaultValues<FieldValues>
}

const MyForm = ({defaultValues = {}, zodSchema, onSubmit, onError, children}: Props) => {
   type EntityType = z.infer<typeof zodSchema>
   const methods = useForm<EntityType>({
      resolver: zodResolver(zodSchema),
      defaultValues
   }); 
   
   if(methods.formState.isLoading) 
      return (
      <Flex height={20} alignItems="center" justifyContent="center">
         <Spinner alignSelf="center" colorScheme='purple' color='purple' />
      </Flex> 
   )

  return (
   <>
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit((data) => onSubmit(data, methods.reset), onError)}>
            {children}
         </form>
      </FormProvider>
      <DevTool control={methods.control} />
   </>
   
  )
}

export default MyForm