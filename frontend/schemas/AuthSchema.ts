import { z } from "zod";

export const LoginSchema = z.object({
   email: z.string().email('Email inválido'),
   code: z.string().length(6, "El código debe tener 6 caracteres")
})

export type LoginType = z.infer<typeof LoginSchema> 