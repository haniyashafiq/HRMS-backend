import { Request, Response } from 'express';
import { ApplicantSchema } from '../dtos/applicant/applicant.dto.js';
import { setPasswordSchema } from '../dtos/applicant/applicantPassword.dto.js';
import { updateApplicantSchema } from '../dtos/applicant/applicantUpdate.dto.js';
import {
  createApplicantService,
  setApplicantPassword,
  updateApplicantService,
} from '../services/applicant.service.js';
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

export const getApplicantById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const applicant = await updateApplicantService.getById(id);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: 'Applicant not found',
      });
    }

    res.json({ success: true, data: applicant });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
};

export const updateApplicant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    //Validate incoming body
    const parsed = updateApplicantSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.issues,
      });
    }

    const updated = await updateApplicantService.update(id, parsed.data);

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
};

export const setPassword = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const parsed = setPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.issues);
    }

    const updatedApplicant = await setApplicantPassword(id, parsed.data);

    return res.status(200).json({
      message: 'Password set successfully',
      applicant: updatedApplicant,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to set password' });
  }
};
