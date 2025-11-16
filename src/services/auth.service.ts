import prisma from "../database/prisma.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import type { LoginDTO } from "../dtos/applicant/login.dto.js";
export const authService = {
  login: async (data: LoginDTO) => {
    const { email, password } = data;

    const applicant = await prisma.applicant.findUnique({
      where: { email },
    });

    if (!applicant || !applicant.passwordHash) {
      throw new Error("Invalid email or password");
    }

    const validPassword = await comparePassword(password, applicant.passwordHash);
    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    // Generate token
    const token = generateToken({
      id: applicant.id,
      email: applicant.email,
    });

    return { token, applicant };
  },
};
