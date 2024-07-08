import { z } from "zod";

export const parseFMGRecords = <TSchema>({
  data,
  zSchema,
  zParsableSchema = zSchema,
}: {
  data: object[];
  zSchema: z.ZodType<TSchema>;
  zParsableSchema?: z.ZodTypeAny;
}) =>
  data.reduce<{
    records: TSchema[];
    unparsable: string[];
  }>(
    (info, obj) => {
      const { records, unparsable } = info;

      const { data: parsableData, error } = zParsableSchema.safeParse(obj);

      if (!error) {
        const { data, success } = zSchema.safeParse(parsableData);
        if (success) records.push(data);
      } else {
        unparsable.push(JSON.stringify(obj));
      }

      return info;
    },
    {
      records: [],
      unparsable: [],
    },
  );
