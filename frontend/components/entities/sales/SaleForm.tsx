import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form'
import { Button, ButtonGroup, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { env } from '~/env';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';

const PAYMENT_METHOD_TYPES = [
   "Sin utilización Sist. Financiero", 
   "Compensación de deudas", 
   "Tarjeta de débito", 
   "Tarjeta de crédito",
   "Dinero electrónico",
   "Tarjeta prepago",
   "Otros con utilización del sistema financiero",
   "Endoso de títulos",
] as const;

const TIME_UNITS = z.enum(["Días", "Meses", "Años"])

const salePaymentMethodsSchema = z.object({
   method: z.enum(PAYMENT_METHOD_TYPES),
   amount: z.number(),
   time_unit: TIME_UNITS,
   time_value: z.number(),   
})

const saleProductSchema = z.object({
   code: z.string(),
   name: z.string(),
   qty: z.number(),
   unit_price: z.number(),
   discount: z.number(),
   total: z.number()
})

const saleSchema = z.object({
   operation_date: z.date(),
   products: z.array(saleProductSchema),
   total_amount: z.number().nonnegative(),
   client: z.string(),
   client_document: z.string(),
   payment_methods: z.array(salePaymentMethodsSchema)
})


export type Sale = z.infer<typeof saleSchema>
type PaymentMethod = z.infer<typeof salePaymentMethodsSchema>

interface Props {
   saleId ?: string
}

const defaultPM: PaymentMethod = {
   method: "Sin utilización Sist. Financiero",
   amount: 0,
   time_unit: "Meses",
   time_value: 0
}

const SaleForm = ({saleId}: Props) => {
   const router = useRouter();
   
   const [startDate, setStartDate] = useState(new Date());

   const { register, setValue, handleSubmit, control, reset, formState: {errors} } = useForm<Sale>({
      resolver: zodResolver(saleSchema),
      defaultValues: async () => {
         if(!saleId) return { 
            payment_methods: [defaultPM]
         }

         const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${saleId}`, {
            withCredentials: true
         }); 
         return data.data;
      }
   });

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'payment_methods'
   })

    const onSubmit = async (data: Sale) => {
      const PARAMS = !!saleId ? `/${saleId}` : ''
      await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, 
         {
            method: !!saleId ? "PUT" : "POST",
            data,
            withCredentials: true
         },
      )
      reset();
      router.push('/')
   }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.client_document} marginBottom={5}>
               <FormLabel>Documento del cliente</FormLabel>
               <Input type='text' placeholder='Ingresa tu nombre' {...register('client_document')} />
               <FormErrorMessage>{errors.client_document?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.operation_date} marginBottom={5}>
               <FormLabel>Fecha de la operación</FormLabel>
               <DatePicker 
                  selected={startDate} 
                  ref={register('operation_date').ref}
                  onChange={(date: Date) => setValue('operation_date', date)} 
               />
               <FormErrorMessage>{errors.operation_date?.message}</FormErrorMessage>
            </FormControl>
            <Flex flexDir="column" mb="4">
                {
                  fields.map((field, index) => (
                     <Flex gap={3} alignItems="center">
                        <FormControl flex={8} marginBottom={5}>
                           <FormLabel>Método</FormLabel>
                           <Select 
                              placeholder='Seleccionar'
                              {...register(`payment_methods.${index}.method`)} >
                              {
                                 PAYMENT_METHOD_TYPES.map(method => (
                                    <option key={method} value={method}>
                                       {method}
                                    </option>
                                 ))
                              }
                           </Select>
                        </FormControl>
                        <FormControl flex={5} isInvalid={!!errors.payment_methods} marginBottom={5}>
                           <FormLabel>Valor</FormLabel>
                           <Input 
                              type='text' 
                              placeholder='Valor' 
                              {...register(`payment_methods.${index}.amount`)} 
                           />
                           {/* <FormErrorMessage>{errors.payment_methods?.message}</FormErrorMessage> */}
                        </FormControl>
                        <FormControl flex={5} isInvalid={!!errors.payment_methods} marginBottom={5}>
                           <FormLabel>Plazo</FormLabel>
                           <Input 
                              type='number' 
                              placeholder='Plazo' 
                              {...register(`payment_methods.${index}.time_value`)} 
                           />
                           {/* <FormErrorMessage>{errors.payment_methods?.message}</FormErrorMessage> */}
                        </FormControl>
                        <FormControl flex={8} marginBottom={5}>
                           <FormLabel>Periodo</FormLabel>
                           <Select 
                              placeholder='Seleccionar' 
                              {...register(`payment_methods.${index}.time_unit`)} 
                           >
                              {
                                 Object.keys(TIME_UNITS.Enum).map(unit => (
                                    <option key={unit} value={unit}>
                                       {unit}
                                    </option>
                                 ))
                              }
                           </Select>
                        </FormControl>
                        {
                           index > 0 && (
                              <IconButton colorScheme='red' aria-label='Delete' mb={-2} icon={<DeleteIcon />} onClick={() => remove(index)} />
                           )
                        }
                     </Flex>
               ))}  
               <Button onClick={() => append(defaultPM)}>Nuevo método</Button>
            </Flex> 
            <ButtonGroup>
               <Button colorScheme='purple' type='submit'>
                  {!!saleId ? 'Guardar cambios' : 'Crear'}
               </Button>
               <Button colorScheme='gray' type='submit' onClick={() => router.back()}>
                  Volver
               </Button>
            </ButtonGroup>
         </form>

          <DevTool control={control} /> {/* set up the dev tool */}
    </>
  )
}

export default SaleForm