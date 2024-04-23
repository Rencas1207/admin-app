import { Request } from 'express';

export interface User {
  firstname: string;
  lastname: string;
  sub: string;
  roles: {
    admin: boolean;
    seller: boolean;
  };
}
