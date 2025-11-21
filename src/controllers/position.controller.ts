import type { Request, Response } from "express";
import { positionService } from "../services/position.service.js";

export const getPositionsByCompany = async (req: Request, res: Response) => {
  try {
    const companyId = Number(req.params.companyId);
    if (isNaN(companyId)) return res.status(400).json({ success: false, message: "Invalid company id" });

    const positions = await positionService.findByCompany(companyId);
    return res.json({ success: true, data: positions });
  } catch (err: unknown) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
