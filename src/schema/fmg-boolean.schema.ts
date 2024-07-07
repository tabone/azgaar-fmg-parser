import { z } from "zod";

export const zFMGBoolean = z.union([z.literal(0), z.literal(1)]);
