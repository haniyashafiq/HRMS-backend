import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { loginSchema } from "../dtos/applicant/login.dto.js";

export const loginApplicant = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.parse(req.body);
    const result = await authService.login(validated);

    res.json({
      success: true,
      data: result.applicant,
      token: result.token,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    res.status(400).json({ success: false, message });
  }
};


