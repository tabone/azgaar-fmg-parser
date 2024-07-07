import { z } from "zod";
import { zCOA } from "../coa.schema";
import { zFMGBoolean } from "../fmg-boolean.schema";

export const zBurg = z.object({
  coa: zCOA,
  i: z.number(),
  name: z.string(),
  type: z.string(),
  port: zFMGBoolean,
  plaza: zFMGBoolean,
  walls: zFMGBoolean,
  shanty: zFMGBoolean,
  temple: zFMGBoolean,
  capital: zFMGBoolean,
  citadel: zFMGBoolean,
  population: z.number(),
  state: z.number().describe("state id"),
  culture: z.number().describe("culture id"),
});

export type TBurg = z.infer<typeof zBurg>;
