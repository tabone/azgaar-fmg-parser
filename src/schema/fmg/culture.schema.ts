import { z } from "zod";

export const zDefaultCulture = z.object({
  i: z.number(),
  name: z.string(),
  base: z.number(),
  shield: z.string(),
  origins: z.tuple([z.null()]),
});

export const zDefinedCulture = zDefaultCulture.merge(
  z.object({
    code: z.string(),
    type: z.string(),
    color: z.string(),
    center: z.number(),
    expansionism: z.number(),
    origins: z.array(z.number()),
  }),
);

export const zCulture = z.union([zDefaultCulture, zDefinedCulture]);

export type TCulture = z.infer<typeof zCulture>;
export type TDefinedCulture = z.infer<typeof zDefinedCulture>;
export type TDefaultCulture = z.infer<typeof zDefaultCulture>;

export const isDefaultCulture = (culture: TCulture): culture is TCulture =>
  culture.i === 0;
