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
  burgs: z.array(z.number()),
  pole: z.tuple([z.number(), z.number()]).optional(),
});

export const zParsableProvince = z.union([
  zProvince,
  z.object({
    i: z.number(),
    removed: z.boolean(),
  }),
]);

export type TProvince = z.infer<typeof zProvince>;
export type TParsableProvince = z.infer<typeof zParsableProvince>;
