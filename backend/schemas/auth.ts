import { Request, Response } from 'express';
import z from 'zod';

export interface User {
  sub: string;
  firstname: string;
  lastname: string;
  roles: {
    admin: boolean;
    seller: boolean;
  };
}

export interface AuthRequest<
  ReqBody = any,
  Params = any,
  ResBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = any
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User;
  cookies: {
    jwt: string;
  };
}

export interface MyRequest<
  ReqBody = any,
  ReqParams = any,
  ReqQuery = any,
  ResBody = any,
  Locals extends Record<string, any> = any
> extends Request<ReqParams, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User;
  cookies: {
    jwt: string;
  };
}

export interface MyResponse<
  ResBody = {
    ok: boolean;
    message?: string;
    data?: any;
  }
> extends Response<ResBody> {}
