import { z } from "zod";

export const parseFMGRecords = <TSchema>({
  data,
  model,
  zSchema,
  debug = false,
  strictMode = false,
  zParsableSchema = zSchema,
}: {
  data: object[];
  debug?: boolean;
  strictMode?: boolean;
  zSchema: z.ZodType<TSchema>;
  zParsableSchema?: z.ZodTypeAny;
  model: "CULTURE" | "STATE" | "RELIGION" | "PROVINCE" | "BURG";
}) => {
  return data.reduce<TSchema[]>((records, obj) => {
    const { data: parsableData, error } = zParsableSchema.safeParse(obj);

    if (!error) {
      const { data, success } = zSchema.safeParse(parsableData);
      if (success) records.push(data);
    } else {
      if (strictMode) throw error;
      if (debug) console.log(`failed to parse '${model}'`, obj);
    }

    return records;
  }, []);
};
