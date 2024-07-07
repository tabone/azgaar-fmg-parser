import { z } from "zod";

export const parseFMGRecords = <TSchema>({
  data,
  model,
  zSchema,
  debug = false,
}: {
  data: object[];
  debug?: boolean;
  zSchema: z.ZodType<TSchema>;
  model: "CULTURE" | "STATE" | "RELIGION" | "PROVINCE" | "BURG";
}) => {
  return data.reduce<TSchema[]>((records, obj) => {
    const { success, data } = zSchema.safeParse(obj);

    if (debug && !success) console.log(`failed to parse '${model}'`, obj);

    if (success) records.push(data);

    return records;
  }, []);
};
