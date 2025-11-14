// src/interfaces/user.interface.ts

import type { UserRole, EmploymentStatus } from "@prisma/client";
import type { UserAccount } from "@prisma/client";
/**
 * Interface for the main user account (auth-related)
 */
export interface IUserAccount {
  id: number;
  email: string;
  passwordHash: string;
  role: UserRole;
  employeeId?: number; // optional link to employee
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for the Employee profile (optional link from UserAccount)
 */
export interface IEmployee {
  id: number;
  employeeCode?: string;
  firstName: string;
  lastName?: string;
  cnic?: string;
  city?: string;
  qualification?: string;
  previousCompany?: string;
  phone?: string;
  whatsappNumber?: string;
  linkedin?: string;
  github?: string;
  portfolioLink?: string;
  jobTitle?: string;
  departmentId?: number;
  status: EmploymentStatus;
  dateOfBirth?: Date;
  hireDate?: Date;
  address?: string;
  cityRegion?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Optional interface combining UserAccount + Employee
 * Useful if you want the authenticated user with profile details
 */
export interface IUser extends UserAccount {
  employee?: IEmployee;
}


export interface CreateUserDTO {
  email: string;
  password: string;
  role?: 'ADMIN' | 'HR' | 'EMPLOYEE';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  role: string;
  verified: boolean;
  createdAt: Date;
}
