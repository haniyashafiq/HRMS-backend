import type { Request, Response } from "express";
import { companyService } from "../services/company.service.js";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await companyService.findAll();
    return res.json({ success: true, data: companies });
  } catch (err: unknown) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
