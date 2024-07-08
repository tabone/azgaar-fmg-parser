import { z } from "zod";
import {
  TBurg,
  TCulture,
  TProvince,
  TReligion,
  TState,
  zBurg,
  zCulture,
  zParsableProvince,
  zProvince,
  zReligion,
  zState,
} from "./schema";
import { parseJSON, indexFMGRecords, parseFMGRecords } from "./utils";

const zFMGProps = z.object({
  burgs: z.array(zBurg),
  states: z.array(zState),
  cultures: z.array(zCulture),
  religions: z.array(zReligion),
  provinces: z.array(zProvince),
});

const zFMGParseProps = z.object({
  data: z.string(),
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
    return this._burgs;
  }

  get states() {
    return this._states;
  }

  get cultures() {
    return this._cultures;
  }

  get religions() {
    return this._religions;
  }

  get provinces() {
    return this._provinces;
  }

  static parse(props: TFMGParseProps) {
    const { data } = zFMGParseProps.parse(props);

    const payload = data.split("\n");

    const statesJSON = parseJSON(payload[149], "states");
    const culturesJSON = parseJSON(payload[148], "cultures");
    const religionsJSON = parseJSON(payload[164], "religions");
    const burgsJSON = parseJSON(payload[150], "burgs").slice(1);
    const provincesJSON = parseJSON(payload[165], "Provinices").slice(1);

    const { records: burgRecords, unparsable: unparsableBurgs } =
      parseFMGRecords({
        zSchema: zBurg,
        data: burgsJSON,
      });

    const { records: stateRecords, unparsable: unparsableStates } =
      parseFMGRecords({
        zSchema: zState,
        data: statesJSON,
      });

    const { records: cultureRecords, unparsable: unparsableCultures } =
      parseFMGRecords({
        zSchema: zCulture,
        data: culturesJSON,
      });

    const { records: religionRecords, unparsable: unparsableReligions } =
      parseFMGRecords({
        zSchema: zReligion,
        data: religionsJSON,
      });

    const { records: provinceRecords, unparsable: unparsableProvinces } =
      parseFMGRecords({
        zSchema: zProvince,
        data: provincesJSON,
        zParsableSchema: zParsableProvince,
      });

    const fmg = new FMG({
      burgs: burgRecords,
      states: stateRecords,
      cultures: cultureRecords,
      religions: religionRecords,
      provinces: provinceRecords,
    });

    return {
      fmg,
      info: [
        {
          name: "burgs",
          json: burgsJSON,
          unparsable: unparsableBurgs,
          stored: Object.values(fmg.burgs).length,
        },
        {
          name: "states",
          json: statesJSON,
          unparsable: unparsableStates,
          stored: Object.values(fmg.states).length,
        },
        {
          name: "cultures",
          json: culturesJSON,
          unparsable: unparsableCultures,
          stored: Object.values(fmg.cultures).length,
        },
        {
          name: "religions",
          json: religionsJSON,
          unparsable: unparsableReligions,
          stored: Object.values(fmg.religions).length,
        },
        {
          name: "provinces",
          json: provincesJSON,
          unparsable: unparsableProvinces,
          stored: Object.values(fmg.provinces).length,
        },
      ].reduce<
        Record<string, { total: number; stored: number; unparsable: string[] }>
      >((info, { name, json, unparsable, stored }) => {
        info[name] = {
          stored,
          total: json.length,
          unparsable: unparsable,
        };

        return info;
      }, {}),
    };
  }
}
