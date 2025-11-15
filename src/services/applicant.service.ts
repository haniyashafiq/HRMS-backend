import prisma from '../database/prisma.js';
import { IApplicantDTO } from '../dtos/applicant/applicant.dto.js';
import { UpdateApplicantDTO } from '../dtos/applicant/applicantUpdate.dto.js';
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
  }
};