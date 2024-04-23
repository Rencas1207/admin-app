import { z } from 'zod';

const DOC_TYPES = [
  'RUC',
  'Cédula',
  'Pasaporte',
  'Identificación Exterior',
] as const;

export const ClientSchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email('Email inválido'),
  document_type: z.enum(DOC_TYPES),
  document_value: z.string().min(4),
});

export const ClientCreationSchema = z.object({
  body: ClientSchema,
});

export type Client = z.infer<typeof ClientSchema>;
