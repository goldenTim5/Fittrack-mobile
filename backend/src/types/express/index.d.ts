import { UserRole } from '@prisma/client'; // or hardcode string union: 'ADMIN' | 'USER'
import 'express';

export interface JwtUser {
  userId: string;
  role: UserRole;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUser;
  }
}