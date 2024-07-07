import { z } from "zod";

export const zReligion = z.object({
  i: z.number(),
  name: z.string(),
  type: z.string().optional(),
  form: z.string().optional(),
  color: z.string().optional(),
  expansion: z.string().optional(),
  deity: z.string().nullable().optional(),
  culture: z.number().optional().describe("culture id"),
  origins: z.array(z.number()).nullable().optional(),
});

export type TReligion = z.infer<typeof zReligion>;
