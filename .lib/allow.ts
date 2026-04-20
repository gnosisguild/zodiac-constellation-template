import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildAllowKit } from "@zodiac-os/sdk/allow";
import { resolveAbisDir } from "@zodiac-os/sdk/cli/config";
import config from "../zodiac.config";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const allow = buildAllowKit(
  resolveAbisDir({ ...config, rootDir }),
  config.contracts ?? {},
) as unknown as AllowKit;
