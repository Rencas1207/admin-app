import { z } from "zod";

export const DOC_TYPES = ["RUC", "Cédula", "Pasaporte", "Identificación Exterior"] as const;

export const ClientSchema = z.object({
   firstname: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
   lastname: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
   email: z.string().email('Email inválido'),
   phoneCode: z.string().default("51"),
   phoneNumber: z.string(),
   document_type: z.enum(DOC_TYPES),
   document_value: z.string().min(4, 'El documento debe tener al menos 4 caracteres'),
   file: z.any(),
}).refine(
   ({ phoneCode, phoneNumber }) => {
   if (phoneCode === "51" && phoneNumber.length !== 9) return false
   return true
   },
   {
   message: "Exacto 9 caracteres si el código es 51",
   path: ["phoneNumber"],
   }
  )
  .refine(
    ({ document_type, document_value }) => {
      if (document_type === "RUC" && document_value.length !== 13) return false
      return true
    },
    {
      message: "RUC debe tener 11 caracteres",
      path: ["document_value"],
    }
  )
  .refine(
    ({ document_type, document_value }) => {
      if (document_type === "Cédula" && document_value.length !== 8)
        return false
      return true
    },
    {
      message: "Cédula debe tener 8 caracteres",
      path: ["document_value"],
    }
  )

export interface ClientFormProps {
   clientId ?: string
}

export type Client = z.infer<typeof ClientSchema>

export interface ClientFromDB extends Client {
   _id: string;
   firstname: string;
   sales?: {
      amount: number;
      count: number;
   }
   comissions?: number
}

export interface ClientListProps {
   clients: ClientFromDB[]
}

export interface ClientFormProps {
  clientId?: string
  refetch?: () => void
}