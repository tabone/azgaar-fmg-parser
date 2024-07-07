import { z } from "zod";

export const parseFMGRecords = <TSchema>({
  data,
  model,
  zSchema,
  debug = false,
  strictMode = false,
}: {
  data: object[];
  debug?: boolean;
  strictMode?: boolean;
  zSchema: z.ZodType<TSchema>;
  model: "CULTURE" | "STATE" | "RELIGION" | "PROVINCE" | "BURG";
}) => {
  return data.reduce<TSchema[]>((records, obj) => {
    const { data, error } = zSchema.safeParse(obj);

    if (!error) {
      records.push(data);
    } else {
      if (strictMode) throw error;
      if (debug) console.log(`failed to parse '${model}'`, obj);
    }

    return records;
  }, []);
};
