import { z } from "zod";
export const updateApplicantSchema = z.object({
  name: z.string().trim().optional(),
  cnic: z.string().trim().optional(),
  city: z.string().trim().optional(),
  qualification: z.string().trim().optional(),
  previousOrg: z.string().trim().optional(),
  contactNumber: z.string().trim().optional(),
  whatsappNumber: z.string().trim().optional(),
  email: z.string().email().trim().optional(),
  linkedin: z.string().trim().optional(),
  domainApplied: z.string().trim().optional(),
  tools: z.array(z.string().trim()).optional(),
  github: z.string().trim().optional(),
});
export type UpdateApplicantDTO = z.infer<typeof updateApplicantSchema>;