import { z } from "zod";
import {
  TBurg,
  TCulture,
  TProvince,
  TReligion,
  TState,
  zBurg,
  zCulture,
  zProvince,
  zReligion,
  zState,
} from "./schema";
import { indexFMGRecords, parseFMGRecords } from "./utils";

const zFMGProps = z.object({
  burgs: z.array(zBurg),
  states: z.array(zState),
  cultures: z.array(zCulture),
  religions: z.array(zReligion),
  provinces: z.array(zProvince),
});

const zFMGParseProps = z.object({
  data: z.string(),
  debug: z.boolean().default(false).optional(),
});

export type TFMGProps = z.infer<typeof zFMGProps>;
export type TFMGParseProps = z.infer<typeof zFMGParseProps>;

export class FMG {
  private _burgs: Record<TBurg["i"], TBurg>;
  private _states: Record<TState["i"], TState>;
  private _cultures: Record<TCulture["i"], TCulture>;
  private _religions: Record<TReligion["i"], TReligion>;
  private _provinces: Record<TProvince["i"], TProvince>;

  constructor(props: TFMGProps) {
    const { burgs, states, cultures, religions, provinces } =
      zFMGProps.parse(props);

    this._burgs = indexFMGRecords(burgs);
    this._states = indexFMGRecords(states);
    this._cultures = indexFMGRecords(cultures);
    this._religions = indexFMGRecords(religions);
    this._provinces = indexFMGRecords(provinces);
  }

  get burgs() {
    return JSON.parse(JSON.stringify(this._burgs));
  }

  get states() {
    return JSON.parse(JSON.stringify(this._states));
  }

  get cultures() {
    return JSON.parse(JSON.stringify(this._cultures));
  }

  get religions() {
    return JSON.parse(JSON.stringify(this._religions));
  }

  get provinces() {
    return JSON.parse(JSON.stringify(this._provinces));
  }

  static parse(props: TFMGParseProps) {
    const { data, debug } = zFMGParseProps.parse(props);

    const payload = data.split("\n");

    return new FMG({
      burgs: parseFMGRecords({
        debug,
        model: "BURG",
        zSchema: zBurg,
        data: JSON.parse(payload[150]).slice(1),
      }),

      states: parseFMGRecords({
        debug,
        model: "CULTURE",
        zSchema: zState,
        data: JSON.parse(payload[149]),
      }),

      cultures: parseFMGRecords({
        debug,
        model: "CULTURE",
        zSchema: zCulture,
        data: JSON.parse(payload[148]),
      }),

      religions: parseFMGRecords({
        debug,
        model: "RELIGION",
        zSchema: zReligion,
        data: JSON.parse(payload[164]),
      }),

      provinces: parseFMGRecords({
        debug,
        model: "PROVINCE",
        zSchema: zProvince,
        data: JSON.parse(payload[165]).slice(1),
      }),
    });
  }
}
