import prisma from "../database/prisma.js";

export const applicationService = {
  checkDuplicate: async ({
    applicantId,
    companyId,
    positionId,
  }: {
    applicantId: number;
    companyId: number;
    positionId?: number | null;
  }) => {
    return prisma.application.findFirst({
      where: {
        applicantId,
        companyId,
        positionId: positionId ?? null,
      },
    });
  },
  create: async (data: {
    applicantId: number;
    companyId: number;
    positionId?: number | null;
    domain?: string | null;
    city?: string | null;
  }) => {
    return prisma.application.create({
      data: {
        applicantId: data.applicantId,
        companyId: data.companyId,
        positionId: data.positionId ?? undefined,
        domain: data.domain,
        city: data.city,
      },
    });
  },

  findByApplicant: async (applicantId: number) => {
    return prisma.application.findMany({
      where: { applicantId },
      include: { company: true, position: true },
      orderBy: { createdAt: "desc" },
    });
  },

  findById: async (id: number) => {
    return prisma.application.findUnique({
      where: { id },
      include: { company: true, position: true, applicant: true },
    });
  }
};
