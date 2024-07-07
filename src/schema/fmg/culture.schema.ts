import { z } from "zod";

export const zDefaultCulture = z.object({
  afpVariant: z.literal("DEFAULT"),
  i: z.number(),
  name: z.string(),
  base: z.number(),
  shield: z.string(),
  origins: z.tuple([z.null()]),
});

export const zDefinedCulture = zDefaultCulture.merge(
  z.object({
    afpVariant: z.literal("DEFINED"),
    code: z.string(),
    type: z.string(),
    color: z.string(),
    center: z.number(),
    expansionism: z.number(),
    origins: z.array(z.number()),
  }),
);

export const zCulture = z.discriminatedUnion("afpVariant", [
  zDefaultCulture,
  zDefinedCulture,
]);

export type TCulture = z.infer<typeof zCulture>;
export type TDefinedCulture = z.infer<typeof zDefinedCulture>;
export type TDefaultCulture = z.infer<typeof zDefaultCulture>;
