import { z } from "zod";

export const zCulture = z.object({
  i: z.number(),
  name: z.string(),
  shield: z.string(),
  type: z.string().optional(),
  color: z.string().optional(),
});

export type TCulture = z.infer<typeof zCulture>;
