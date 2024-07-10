import { z } from "zod";
import { zCOA } from "../coa.schema";

export const zBurg = z.object({
  coa: zCOA,
  i: z.number(),
  x: z.number(),
  y: z.number(),
  cell: z.number(),
  name: z.string(),
  type: z.string(),
  port: z.number(),
  state: z.number(),
  plaza: z.number(),
  walls: z.number(),
  shanty: z.number(),
  temple: z.number(),
  culture: z.number(),
  feature: z.number(),
  capital: z.number(),
  citadel: z.number(),
  population: z.number(),
});

export type TBurg = z.infer<typeof zBurg>;
