import { z } from "zod";

export const zDefaultReligion = z.object({
  afpVariant: z.literal("DEFAULT"),
  i: z.number(),
  name: z.string(),
  origins: z.null(),
});

export const zDefinedReligion = zDefaultReligion.merge(
  z.object({
    afpVariant: z.literal("DEFINED"),
    code: z.string(),
    type: z.string(),
    form: z.string(),
    color: z.string(),
    deity: z.string(),
    center: z.number(),
    culture: z.number(),
    expansion: z.string(),
    expansionism: z.number(),
    origins: z.array(z.number()),
  }),
);

export const zReligion = z.discriminatedUnion("afpVariant", [
  zDefaultReligion,
  zDefinedReligion,
]);

export type TReligion = z.infer<typeof zReligion>;
export type TDefinedReligion = z.infer<typeof zDefinedReligion>;
export type TDefaultReligion = z.infer<typeof zDefaultReligion>;
