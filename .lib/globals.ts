import { allow as _allow } from "zodiac-roles-sdk/kit";
import { c as _c } from "zodiac-roles-sdk";
import type * as types from "./types";
import { ref as _ref } from "./ref";

declare global {
  var allow: typeof _allow;
  var c: typeof _c;
  type ContractsConfig = types.ContractsConfig;
  type Permissions = types.Permissions;
  type Specification = types.Specification;
  var ref: typeof _ref;
}

globalThis.allow = _allow;
globalThis.c = _c;

globalThis.ref = _ref;
