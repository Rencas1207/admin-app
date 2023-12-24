import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface UserToken {
  sub: string;
  firstname: string;
  lastname: string;
  roles: {
    admin: boolean;
    seller: boolean;
  };
}

export interface CustomRequest extends Request {
  user: UserToken;
}

export const validateUser = () => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      console.log('PROTECTED ROUTES, validating users...');
      const token = req.cookies.jwt;
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      req.user = user as UserToken;
      next();
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError
      ) {
        return res.status(401).json({ ok: false, message: error.message });
      }
      next();
    }
  };
};
