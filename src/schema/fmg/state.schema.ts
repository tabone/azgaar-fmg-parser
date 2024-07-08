import { z } from "zod";
import { zCOA } from "../coa.schema";

export const zDefaultState = z.object({
  i: z.literal(0),
  name: z.string(),
  area: z.number(),
  urban: z.number(),
  rural: z.number(),
  burgs: z.number(),
  cells: z.number(),
  neighbors: z.array(z.number()),
  provinces: z.array(z.number()),
  diplomacy: z.array(z.array(z.string())),
});

export const zDefinedState = zDefaultState.merge(
  z.object({
    i: z.number(),
    coa: zCOA,
    type: z.string(),
    form: z.string(),
    color: z.string(),
    alert: z.number(),
    center: z.number(),
    culture: z.number(),
    capital: z.number(),
    formName: z.string(),
    fullName: z.string(),
    expansionism: z.number(),
    diplomacy: z.array(z.string()),
    pole: z.tuple([z.number(), z.number()]),
    military: z.array(z.object({}).passthrough()),
    campaigns: z.array(
      z.object({
        end: z.number(),
        name: z.string(),
        start: z.number(),
      }),
    ),
  }),
);

export const zState = z.union([zDefaultState, zDefinedState]);

export type TState = z.infer<typeof zState>;
export type TDefinedState = z.infer<typeof zDefinedState>;
export type TDefaultState = z.infer<typeof zDefaultState>;

export const isDefaultState = (state: TState): state is TDefaultState =>
  state.i === 0;
