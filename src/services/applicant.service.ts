import prisma from "../database/prisma.js";
import { IApplicantDTO } from "../dtos/applicant.dto.js";

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
