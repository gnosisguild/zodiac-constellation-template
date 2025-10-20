import { NestedAddressesInput } from "@gnosis-guild/eth-sdk/dist/config";
import { Permission, PermissionSet } from "zodiac-roles-sdk";
import { ApplyConstellationPayload } from "@zodiac-os/api-types";

export type Chain = ApplyConstellationPayload["specification"][number]["chain"];

export type ContractsConfig = {
  [chainName in Chain]?: NestedAddressesInput;
};

export type Permissions = (
  | Permission
  | PermissionSet
  | Promise<PermissionSet>
)[];

export type Role = {
  members: (Ref | `0x${string}`)[];
  permissions: Permissions;
};

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type Ref = (completion: any) => { ref: Lowercase<string> };

type EnhanceRefs<T> = T extends `$${Lowercase<string>}`
  ? Ref
  : T extends (infer U)[]
    ? EnhanceRefs<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: EnhanceRefs<T[K]> }
      : T;

type AllowChecksumAddresses<T> = T extends `0x${Lowercase<string>}`
  ? `0x${string}`
  : T extends (infer U)[]
    ? AllowChecksumAddresses<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: AllowChecksumAddresses<T[K]> }
      : T;

type Safe = Prettify<
  Extract<ApplyConstellationPayload["specification"][number], { type: "SAFE" }>
>;
type Delay = Prettify<
  Extract<ApplyConstellationPayload["specification"][number], { type: "DELAY" }>
>;
type Roles = Prettify<
  Omit<
    Extract<
      ApplyConstellationPayload["specification"][number],
      { type: "ROLES" }
    >,
    "roles"
  > & { roles: { [key: string]: Role | null } }
>;

export type Node = EnhanceRefs<AllowChecksumAddresses<Safe | Delay | Roles>>;

export type Specification = Node[];
