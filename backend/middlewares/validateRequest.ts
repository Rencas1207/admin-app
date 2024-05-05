import { NextFunction, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: any, _: Response, next: NextFunction) => {
    console.log('Validating request');
    schema.parse({ body: req.body, params: req.params, query: req.query });
    console.log('Valid request');
    next();
  };
  // return (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     console.log('Validating request...');
  //     const result = schema.parse({
  //       body: req.body,
  //       params: req.params,
  //     });
  //     console.log({ result });
  //     next();
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       console.log({ error });
  //       return res.status(400).json({
  //         ok: false,
  //         errors: error.errors.map((e) => ({
  //           code: e.code,
  //           message: e.message,
  //           path: e.path,
  //         })),
  //       });
  //     }
  //     console.log('Server error', { error });
  //     res.status(500).json({ ok: false, message: 'Error del servidor' });
  //   }
  // };
};
