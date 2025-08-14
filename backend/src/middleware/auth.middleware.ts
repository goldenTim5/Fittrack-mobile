import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import { JwtUser } from '../types/express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUser;

    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export const adminOnly = (req:Request, res:Response, next:NextFunction) => {
  if (req.user?.role !== 'ADMIN') return res.sendStatus(403);
  next();
};