import { z } from "zod";
import { zCOA } from "../coa.schema";

export const zProvince = z.object({
  coa: zCOA,
  i: z.number(),
  burg: z.number(),
  name: z.string(),
  state: z.number(),
  color: z.string(),
  center: z.number(),
  formName: z.string(),
  fullName: z.string(),
  pole: z.tuple([z.number(), z.number()]),
});

export type TProvince = z.infer<typeof zProvince>;
