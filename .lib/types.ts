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

export type Ref = (completion: any) => { ref: Lowercase<string> };

export type Role = {
  members: (Ref | `0x${string}`)[];
  permissions: Permissions;
};

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type EnhanceRefs<T> = T extends `$${Lowercase<string>}`
  ? Ref
  : T extends (infer U)[]
    ? EnhanceRefs<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: EnhanceRefs<T[K]> }
      : T;

// TODO remove AllowChecksumAddresses once we've released the adjusted Zodiac OS api-types

type AllowChecksumAddresses<T> = T extends `0x${Lowercase<string>}`
  ? `0x${string}`
  : T extends (infer U)[]
    ? AllowChecksumAddresses<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: AllowChecksumAddresses<T[K]> }
      : T;

type Safe = Prettify<
  EnhanceRefs<
    Extract<
      ApplyConstellationPayload["specification"][number],
      { type: "SAFE" }
    >
  >
>;
type Delay = Prettify<
  EnhanceRefs<
    Extract<
      ApplyConstellationPayload["specification"][number],
      { type: "DELAY" }
    >
  >
>;
type Roles = Prettify<
  EnhanceRefs<
    Omit<
      Extract<
        ApplyConstellationPayload["specification"][number],
        { type: "ROLES" }
      >,
      "roles"
    >
  > & { roles: { [key: string]: Role | null } }
>;

export type Node = Safe | Delay | Roles;
export type Specification = Node[];
