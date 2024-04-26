import { z } from "zod";

export const PAYMENT_METHOD_TYPES = [
   "Sin utilización Sist. Financiero", 
   "Compensación de deudas", 
   "Tarjeta de débito", 
   "Tarjeta de crédito",
   "Dinero electrónico",
   "Tarjeta prepago",
   "Otros con utilización del sistema financiero",
   "Endoso de títulos",
] as const;

export const TIME_UNITS = z.enum(["Días", "Meses", "Años"])

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
   unit_price: z.number(),
   discount: z.number().optional(),
})


export const saleSchema = z.object({
   operation_date: z.date(),
   client_document: z.string(),
   products: z.array(saleProductSchema),
   payment_methods: z.array(salePaymentMethodsSchema)
})

export type Sale = z.infer<typeof saleSchema>
export type PaymentMethod = z.infer<typeof salePaymentMethodsSchema>
export type ProductForState = z.infer<typeof saleProductSchema>

export interface Product extends ProductForState {
   supplier_cost: number,
   micro: number,
   iva: number,
   salvament_margin: number,
   profit_margin: number,
}

export interface SaleFormProps {
   saleId?: string
}

export const defaultPM: PaymentMethod = {
   method: "Sin utilización Sist. Financiero",
   amount: 0,
   time_unit: "Meses",
   time_value: 0
}

export const defaultProduct: ProductForState = {
   code: "",
   name: "",
   qty: 0,
   unit_price: 0
}

