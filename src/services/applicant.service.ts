import prisma from '../database/prisma.js';
import { IApplicantDTO } from '../dtos/applicant/applicant.dto.js';
import { SetPasswordDTO } from '../dtos/applicant/applicantPassword.dto.js';
import { UpdateApplicantDTO } from '../dtos/applicant/applicantUpdate.dto.js';
import { hashPassword } from '../utils/hash.js';

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

export const setApplicantPassword = async (id: number, data: SetPasswordDTO) => {
  const hashed = await hashPassword(data.password);
  return prisma.applicant.update({
    where: { id },
    data: { passwordHash: hashed },
  });
};
