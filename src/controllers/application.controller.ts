import type { Request, Response } from "express";
import { applicationService } from "../services/application.service.js";
import { companyService } from "../services/company.service.js";
import { positionService } from "../services/position.service.js";
import type { AuthRequest } from "../interfaces/jwt.interface.js";
import { applyDTO } from "../dtos/applicant/application.dto.js";
export const apply = async (req: Request, res: Response) => {
  try {
    // cast to AuthRequest to get auth user
    const authReq = req as AuthRequest;
    if (!authReq.authUser) return res.status(401).json({ success: false, message: "Unauthorized" });

    const applicantId = authReq.authUser.id;
const parsed = applyDTO.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parsed.error.format(),
      });
    }
const { companyId, positionId, domain, city } = parsed.data;
   
    //check company exists
    const company = await companyService.findById(Number(companyId));
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    // Optionally check position belongs to company (if positionId provided)
    if (positionId) {
      const position = await positionService.findById(Number(positionId));
      if (!position || position.companyId !== company.id) {
        return res.status(400).json({ success: false, message: "Position not valid for selected company" });
      }
    }
// check for duplicate application
 const duplicate = await applicationService.checkDuplicate({
      applicantId,
      companyId,
      positionId: positionId ?? null,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this position/company",
      });
    }
// create application
    const application = await applicationService.create({
      applicantId,
      companyId: Number(companyId),
      positionId: positionId ? Number(positionId) : undefined,
      domain: domain ?? null,
      city: city ?? null,
    });

    return res.json({ success: true, message: "Application submitted", data: application });
  } catch (err: unknown) {
    console.error("Apply error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const previewResume = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.authUser) return res.status(401).json({ success: false, message: "Unauthorized" });

    // get the applicant record and return resume url/path
    const applicant = await (await import("../database/prisma.js")).default.applicant.findUnique({
      where: { id: authReq.authUser.id },
      select: { resume: true },
    });

    return res.json({ success: true, data: applicant });
  } catch (err: unknown) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
