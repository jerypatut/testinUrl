import { Request, Response, NextFunction } from 'express';

export const methodNotAllowed = (allowedMethods: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).json({ 
        error: `Method ${req.method} tidak diizinkan. Hanya ${allowedMethods.join(', ')}` 
      });
    }
    next();
  };
};
