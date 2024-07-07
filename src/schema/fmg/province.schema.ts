import { z } from "zod";
import { zCOA } from "../coa.schema";

export const zProvince = z.object({
  coa: zCOA,
  i: z.number(),
  burg: z.number(),
  name: z.string(),
  state: z.number(),
  color: z.string(),
  formName: z.string(),
  fullName: z.string(),
});

export type TProvince = z.infer<typeof zProvince>;
