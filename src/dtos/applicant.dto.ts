import { z } from "zod";

export const ApplicantSchema = z.object({
  name: z.string().min(2).trim(),
  cnic: z.string().trim(),
  city: z.string().trim(),
  qualification: z.string().trim(),
  previousOrg: z.string().trim(),
  contactNumber: z.string().trim(),
  whatsappNumber: z.string().trim(),
  email: z.email().trim(),
  linkedin: z.string().trim().optional(),
  domainApplied: z.string().trim(),
  tools: z.array(z.string().trim()),
  github: z.string().trim().optional()
});

// For TypeScript
export type IApplicantDTO = z.infer<typeof ApplicantSchema>;