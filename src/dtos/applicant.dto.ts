import { z } from "zod";

export const ApplicantSchema = z.object({
  name: z.string().min(2),
  cnic: z.string(),
  city: z.string(),
  qualification: z.string(),
  previousOrg: z.string(),
  contactNumber: z.string(),
  whatsappNumber: z.string(),
  email: z.email(),
  linkedin: z.string().optional(),
  domainApplied: z.string(),
  tools: z.array(z.string()),
  github: z.string().optional()
});

// For TypeScript
export type IApplicantDTO = z.infer<typeof ApplicantSchema>;