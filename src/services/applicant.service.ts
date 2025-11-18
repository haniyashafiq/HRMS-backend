import prisma from '../database/prisma.js';
import { IApplicantDTO } from '../dtos/applicant/applicant.dto.js';
import { SetPasswordDTO } from '../dtos/applicant/applicantPassword.dto.js';
import { UpdateApplicantDTO } from '../dtos/applicant/applicantUpdate.dto.js';
import { hashPassword } from '../utils/hash.js';
import { comparePassword } from '../utils/hash.js';
import { ChangePasswordDTO } from '../dtos/applicant/changePassword.dto.js';
import type { InternalSetPasswordDTO } from "../dtos/applicant/applicantPassword.dto.js";


export const createApplicantService = async (
  data: IApplicantDTO & {
    profilePhoto: string | null;
    resume: string | null;
    certificates: string[];
  }
) => {
  return prisma.applicant.create({
    data: {
      ...data,
      tools: data.tools,
      certificates: data.certificates,
    },
  });
};

export const updateApplicantService = {
  getById: (id: number) => {
    return prisma.applicant.findUnique({ where: { id } });
  },

  update: (id: number, data: UpdateApplicantDTO) => {
    return prisma.applicant.update({
      where: { id },
      data,
    });
  },
};

export const setApplicantPassword = async (id: number, data: InternalSetPasswordDTO) => {
  const hashed = await hashPassword(data.password);
  return prisma.applicant.update({
    where: { id },
    data: { passwordHash: hashed },
  });
};

export const changePasswordService = async (
  userId: number,
  data: ChangePasswordDTO
) => {
  const { currentPassword, newPassword, confirmPassword } = data;

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match");
  }

  // 1. find current user
  const user = await prisma.applicant.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  if (!user.passwordHash) {
  return { success: false, message: "No password is set for this account" };
}

  // 2. verify current password
  const isValid = await comparePassword(currentPassword, user.passwordHash);
  if (!isValid) throw new Error("Current password is incorrect");

  // 3. reuse your existing method
  return setApplicantPassword(userId, { password: newPassword });
};