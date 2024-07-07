import { z } from "zod";
import { zCOA } from "../coa.schema";

export const zState = z.object({
  i: z.number(),
  name: z.string(),
  neighbors: z.array(z.number()),
  burgs: z.number().describe("number of burgs"),

  coa: zCOA.optional(),
  type: z.string().optional(),
  form: z.string().optional(),
  color: z.string().optional(),
  culture: z.number().optional(),
  formName: z.string().optional(),
  fullName: z.string().optional(),
  provinces: z.array(z.number()).optional(),
  capital: z.number().optional().describe("burg id"),
});

export type TState = z.infer<typeof zState>;
