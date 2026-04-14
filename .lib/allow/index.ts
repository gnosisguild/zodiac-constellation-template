import contracts from "../../contracts";
import { buildAllowKit } from "./runtime";
import { EVERYTHING } from "./types";

export const allow = buildAllowKit(contracts) as unknown as AllowKit;
export { EVERYTHING };
export type { Options, Scoping, ConditionFunction } from "./types";
