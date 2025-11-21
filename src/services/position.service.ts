import prisma from "../database/prisma.js";

export const positionService = {
  findByCompany: async (companyId: number) => {
    return prisma.position.findMany({
      where: { companyId },
      select: { id: true, title: true, domain: true, city: true },
      orderBy: { title: "asc" },
    });
  },

  findById: async (id: number) => {
    return prisma.position.findUnique({ where: { id } });
  }
};
