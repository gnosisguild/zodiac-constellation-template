import { buildAllowKit } from "@zodiac-os/sdk/allow";
import {
  resolveAbisDir,
  type ZodiacConfig,
} from "@zodiac-os/sdk/cli/config";
import config from "../zodiac.config";

export const allow = buildAllowKit(
  resolveAbisDir(config as ZodiacConfig),
  config.contracts ?? {},
) as unknown as AllowKit;
