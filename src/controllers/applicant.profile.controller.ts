import { Request, Response } from 'express';
import { updateApplicantSchema } from '../dtos/applicant/applicantUpdate.dto.js';
import type { AuthRequest } from '../interfaces/jwt.interface.js';
import { updateApplicantService } from '../services/applicant.service.js';

export const getMyProfile = async (req: Request, res: Response): Promise<Response | void> => {
  const authReq = req as unknown as AuthRequest;

  if (!authReq.authUser) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
const { passwordHash, createdAt, ...safeUser } = authReq.authUser;
  // authReq.authUser already contains the full applicant object from middleware
  res.json({ success: true, data: safeUser });
};

export const updateMyProfile = async (req: Request, res: Response): Promise<Response | void> => {
  const authReq = req as AuthRequest;
  try {
    // Validate text fields
    const validated = updateApplicantSchema.parse(authReq.body);

    // Uploaded files
    const files = authReq.files;

    const profilePhoto = files?.profilePhoto?.[0]?.path;
    const resume = files?.resume?.[0]?.path;
    const certificates = files?.certificates?.map((f) => f.path);

    const updated = await updateApplicantService.update(authReq.authUser!.id, {
      ...validated,
      ...(profilePhoto ? { profilePhoto } : {}),
      ...(resume ? { resume } : {}),
      ...(certificates ? { certificates } : {}),
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Update failed',
    });
  }
};
