import { z } from "zod";
import { zCOA } from "../coa.schema";
import { zFMGBoolean } from "../fmg-boolean.schema";

export const zBurg = z.object({
  coa: zCOA,
  i: z.number(),
  x: z.number(),
  y: z.number(),
  cell: z.number(),
  name: z.string(),
  type: z.string(),
  state: z.number(),
  port: zFMGBoolean,
  plaza: zFMGBoolean,
  walls: zFMGBoolean,
  shanty: zFMGBoolean,
  temple: zFMGBoolean,
  culture: z.number(),
  feature: z.number(),
  capital: zFMGBoolean,
  citadel: zFMGBoolean,
  population: z.number(),
});

export type TBurg = z.infer<typeof zBurg>;
