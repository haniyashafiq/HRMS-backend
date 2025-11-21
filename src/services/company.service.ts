import prisma from "../database/prisma.js";

export const companyService = {
  findAll: async () => {
    return prisma.company.findMany({
      select: { id: true, name: true, createdAt: true },
      orderBy: { name: "asc" },
    });
  },

  findById: async (id: number) => {
    return prisma.company.findUnique({ where: { id } });
  },
};
