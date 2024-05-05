import { Children, ReactNode, cloneElement } from "react"
import { Flex, Spinner } from '@chakra-ui/react';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues, FormProvider, FieldValues } from 'react-hook-form';
import { z } from 'zod';

interface Props<T> {
   zodSchema: z.Schema
   onSubmit: (data: T, reset: any) => Promise<void> | void
   onError: (data: FieldValues) => void
   children: ReactNode
   defaultValues?: DefaultValues<FieldValues>
}

const MyForm = <T,>({defaultValues, zodSchema, onSubmit, onError, children}: Props<T>) => {
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

   const renderChildren = () => {
      return Children.map(children, (child: any) => {
         let props = {}

         if ("name" in child?.type) {
            props = {
               getValues: methods.getValues,
               onSubmit,
               reset: methods.reset,
            }
         }
         return cloneElement(child, props)
      })
  }

  return (
   <>
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(
            async (data) => {
               await onSubmit(data, methods.reset)
            }, (errors) => {
            console.log({ data: methods.getValues() })
            onError(errors)
          })}>
             {renderChildren()}
         </form>
      </FormProvider>
      <DevTool control={methods.control} />
   </>
   
  )
}

export default MyForm