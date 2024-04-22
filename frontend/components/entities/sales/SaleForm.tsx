import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { Button, ButtonGroup, Card, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, Select, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { env } from '~/env';
import axios from 'axios';
import { DevTool } from '@hookform/devtools';
import { useToast } from '@chakra-ui/react'

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';

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
   name: z.string().optional(),
   qty: z.number(),
   unit_price: z.number().optional(),
   discount: z.number().optional(),
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
type ProductForState = z.infer<typeof saleProductSchema>

interface Product extends ProductForState {
   supplier_cost: number,
   micro: number,
   iva: number,
   salvament_margin: number,
   profit_margin: number,
}

interface Props {
   saleId ?: string
}

const defaultPM: PaymentMethod = {
   method: "Sin utilización Sist. Financiero",
   amount: 0,
   time_unit: "Meses",
   time_value: 0
}

const defaultProduct: ProductForState = {
   code: "",
   name: "",
   qty: 0,
   total: 0
}

const SaleForm = ({saleId}: Props) => {
   const router = useRouter();
   const toast = useToast();
   
   const [totalAmount, setTotalAmount] = useState(0);
   const [foundClient, setFoundClient] = useState<{_id: string, firstname: string} | null>(null);

   const { register, setValue, getValues, handleSubmit, control, reset, formState: {errors} } = useForm<Sale>({
      resolver: zodResolver(saleSchema),
      defaultValues: async () => {
         if(!saleId) return { 
            payment_methods: [defaultPM],
            products: [defaultProduct]
         }

         const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${saleId}`, {
            withCredentials: true
         }); 
         return data.data;
      }
   });

   const productsState = useWatch({
      control,
      name: 'products'
   })

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'payment_methods'
   })

    const { fields: products, append: addProduct, remove: removeProduct } = useFieldArray({
      control,
      name: 'products'
   })

    const onSubmit = async (data: Sale) => {
      if(!foundClient) return;
      const PARAMS = !!saleId ? `/${saleId}` : ''
      await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, 
         {
            method: !!saleId ? "PUT" : "POST",
            data: {...data, client: foundClient._id},
            withCredentials: true
         },
      )
      reset();
      router.push('/')
   }
   

   useEffect(() => {
      const currentProducts = getValues('products');
      if(currentProducts.length > 0) {
         let amount = currentProducts.reduce((prev, curr) => prev + curr.qty * curr.total, 0)
         setTotalAmount(amount)
         setValue(`payment_methods.0.amount`, amount);
      }
   }, [productsState])

   // if(isLoading) return (
   //    <Flex height={20} alignItems="center" justifyContent="center">
   //       <Spinner alignSelf="center" colorScheme='purple' color='purple' />
   //    </Flex> 
   // )

   console.log({totalAmount});

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.client_document} marginBottom={5}>
               <FormLabel>Documento del cliente</FormLabel>
               <Flex gap={3}>
                  <IconButton 
                     aria-label='Search' 
                     icon={<SearchIcon />} 
                     onClick={async () => {
                        const document = getValues('client_document');
                        
                        if(!document) return;

                        const { data } = await axios.get(`${env.           NEXT_PUBLIC_BACKEND_BASE_URL}/clients/document/${document}`, 
                           { withCredentials: true }
                        )
                        console.log(data);
                        setValue('client', data.data._id);
                        setFoundClient(data.data)
                     }}
                  />
                  <Input type='text' placeholder='Ingresa tu nombre' {...register('client_document')} />
               </Flex>
               {!!foundClient && (
                  <Card mt={3} p={3}>
                     <Text>{foundClient?.firstname}</Text>
                  </Card>
               )}
               <FormErrorMessage>{errors.client_document?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.operation_date} marginBottom={5}>
               <FormLabel>Fecha de la operación</FormLabel>
               <Input type='date' {...register("operation_date")} />
               <FormErrorMessage>{errors.operation_date?.message}</FormErrorMessage>
            </FormControl>
            <Flex alignItems="center" justifyContent={"space-between"} mt={8}>
               <Heading size="md">Productos</Heading>
               <Button 
                  size="md" 
                  lineHeight="1rem" 
                  py={4} 
                  colorScheme='blue'
                  onClick={() => addProduct(defaultProduct)}
                >
                  Agregar
               </Button>
            </Flex>
            <Divider mb={3} mt={2} />
             <Flex flexDir="column" mb="4">
                {
                  products.map((field, index) => (
                     <Flex key={field.id} gap={3} alignItems="flex-end" mb={5}>
                        <IconButton 
                           aria-label='Search' 
                           icon={<SearchIcon />} 
                           onClick={async () => {
                              const code = getValues(`products.${index}.code`);
                              
                              if(!code) return;

                              const { data } = await axios.get(`${env.           NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`, 
                                 { withCredentials: true }
                              )

                              const product: Product = data.data;

                              const {supplier_cost, micro, iva, profit_margin, salvament_margin} = product;
                              const ivaAmount = iva * supplier_cost
                              const baseCost = micro + supplier_cost
                              const minimumCost = baseCost / (1 - salvament_margin)
                              const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3);

                              if(!!product) {
                                 setValue(`products.${index}`, {
                                    code,
                                    name: product.name,
                                    qty: 1,
                                    total: finalPrice
                                 })
                              } else {
                                 toast({
                                     title: 'Producto',
                                    description: "No se pudo encontrar el producto",
                                    status: 'error',
                                    isClosable: true,
                                    position: 'top'
                                 })
                              }

                              console.log(data);
                           }}
                        />
                        <FormControl flex={2}>
                           {index === 0 && <FormLabel>Código</FormLabel> }
                           <Input 
                              type='text' 
                              placeholder='Código' 
                              {...register(`products.${index}.code`)} 
                           />
                        </FormControl>
                        <FormControl flex={5}>
                           {index === 0 && <FormLabel>Denominación</FormLabel> }
                           <Input 
                              type='text' 
                              placeholder='Denominación' 
                              {...register(`products.${index}.name`)} 
                              disabled
                           />
                        </FormControl>
                        <FormControl flex={1}>
                           {index === 0 && <FormLabel>Cantidad</FormLabel> }
                           <Input 
                              type='number' 
                              placeholder='Cantidad' 
                              {...register(`products.${index}.qty`, {
                                 valueAsNumber: true
                              })} 
                           />
                        </FormControl>
                        {
                           index > 0 && (
                              <IconButton flex={1} colorScheme='red' aria-label='Delete'  icon={<DeleteIcon />} onClick={() => removeProduct(index)} />
                           )
                        }
                     </Flex>
               ))}  
            </Flex> 
            <Flex flexDir="column" mb="4">
                {
                  fields.map((field, index) => (
                     <Flex key={field.id} gap={3} alignItems="center">
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