import { z } from "zod";

export const leadCreateDto = z.object({
  first_name: z.string(),
  last_name: z.string(),
  status: z.enum(['new', 'qualified', 'non-responsive']).optional().default('new'),
  email: z.string().email(),
})

export const leadUpdateDto = leadCreateDto.partial()

export type LeadCreateDto = z.infer<typeof leadCreateDto>
export type LeadUpdateDto = z.infer<typeof leadUpdateDto>
