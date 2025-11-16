import type { UserRole } from "@prisma/client";

// export interface JwtPayload {
//   id: number;          // UserAccount.id
//   role: UserRole;      // Admin, HR, Employee
//   employeeId?: number; // Optional
// }

export interface JwtPayload {
  id: number;          // UserAccount.id
  email: string;
 
}

export interface AuthRequest extends Request { //applicant login middleware uses this
   headers: Request['headers'] & { authorization?: string }; // add authorization
  user?: { id: number; email: string };
}