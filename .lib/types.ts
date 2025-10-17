import {
  Address,
  NestedAddressesInput,
} from "@gnosis-guild/eth-sdk/dist/config";
import { Permission, PermissionSet } from "zodiac-roles-sdk";
import { ApplyConstellationPayload } from "@zodiac-os/api-types";
import {} from "@zodiac-os/sdk";

export type Chain = ApplyConstellationPayload["specification"][number]["chain"];

export type ContractsConfig = {
  [chainName in Chain]?: NestedAddressesInput;
};

export type Permissions = (
  | Permission
  | PermissionSet
  | Promise<PermissionSet>
)[];

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type Ref = (completion: any) => { ref: Lowercase<string> };

type EnhanceRefs<T> = T extends `$${Lowercase<string>}`
  ? Ref
  : T extends (infer U)[]
    ? EnhanceRefs<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: EnhanceRefs<T[K]> }
      : T;

type Safe = Prettify<
  Extract<ApplyConstellationPayload["specification"][number], { type: "SAFE" }>
>;
type Delay = Prettify<
  Extract<ApplyConstellationPayload["specification"][number], { type: "DELAY" }>
>;
type Roles = Prettify<
  Extract<ApplyConstellationPayload["specification"][number], { type: "ROLES" }>
>;
export type Node = EnhanceRefs<Safe> | EnhanceRefs<Delay> | EnhanceRefs<Roles>;

export type Specification = Node[];
