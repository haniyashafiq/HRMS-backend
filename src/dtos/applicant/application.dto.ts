import { z } from "zod";

export const applyDTO = z.object({
  companyId: z.number({
    error: (issue) => issue.input === undefined 
    ? "companyId is required" 
    : "companyId must be a number"
  }),
  // optional → user may apply without selecting position
  positionId: z.number().optional().nullable(),
  // optional fields
  domain: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
});

export type ApplyInput = z.infer<typeof applyDTO>;
