import type { UserRole } from "@prisma/client";

export interface JwtPayload {
  id: number;          // UserAccount.id
  role: UserRole;      // Admin, HR, Employee
  employeeId?: number; // Optional
}
