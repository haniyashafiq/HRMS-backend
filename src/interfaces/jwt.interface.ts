import type { Applicant } from '@prisma/client';
import type { Request } from 'express';
// export interface JwtPayload {
//   id: number;          // UserAccount.id
//   role: UserRole;      // Admin, HR, Employee
//   employeeId?: number; // Optional
// }

export interface JwtPayload {
  id: number; // UserAccount.id
  email: string;
}

export interface AuthRequest extends Request {
  //applicant login middleware uses this
  headers: Request['headers'] & { authorization?: string }; // add authorization
  authUser?: Applicant;
  files?: Record<string, Express.Multer.File[]>;
}
