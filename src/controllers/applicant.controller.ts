import { Request, Response } from "express";
import { createApplicantService } from "../services/applicant.service.js";
import { ApplicantSchema } from "../dtos/applicant.dto.js";

export const createApplicant = async (req: Request, res: Response) => {
  try {
    // Extract uploaded files
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;

    const profilePhoto = files?.profilePhoto?.[0]?.path || null;
    const resume = files?.resume?.[0]?.path || null;
    const certificates = files?.certificates?.map((file) => file.path) || [];

    // Validate request body with Zod
    const validated = ApplicantSchema.parse(req.body);

    const applicant = await createApplicantService({
      ...validated,
      profilePhoto,
      resume,
      certificates,
    });

    return res.json({ success: true, data: applicant });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));

    return res.status(400).json({ message: error.message });
  }
};
