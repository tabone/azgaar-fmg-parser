import { z } from "zod";

export const zDefaultReligion = z.object({
  i: z.literal(0),
  name: z.string(),
  origins: z.null(),
});

export const zDefinedReligion = zDefaultReligion.merge(
  z.object({
    i: z.number(),
    code: z.string(),
    type: z.string(),
    form: z.string(),
    color: z.string(),
    center: z.number(),
    culture: z.number(),
    expansion: z.string(),
    expansionism: z.number(),
    deity: z.string().nullable(),
    origins: z.array(z.number()),
  }),
);

export const zReligion = z.union([zDefaultReligion, zDefinedReligion]);

export type TReligion = z.infer<typeof zReligion>;
export type TDefinedReligion = z.infer<typeof zDefinedReligion>;
export type TDefaultReligion = z.infer<typeof zDefaultReligion>;

export const isDefaultReligion = (
  religion: TReligion,
): religion is TDefaultReligion => religion.i === 0;
