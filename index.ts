import fs from "fs/promises";
import path from "path";
import { FMG } from "./src";

fs.readFile(path.join(__dirname, "fmg.map"))
  .then((content) => {
    const fmg = FMG.parse({
      debug: true,
      data: content.toString("utf-8"),
    });

    console.log(fmg.burgs);
  })
  .catch(console.error);
