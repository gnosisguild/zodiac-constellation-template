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

type RealBigints<T> = T extends `${bigint}`
  ? bigint
  : T extends (infer U)[]
    ? RealBigints<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: RealBigints<T[K]> }
      : T;

type Safe = Prettify<
  EnhanceRefs<
    RealBigints<
      Extract<
        ApplyConstellationPayload["specification"][number],
        { type: "SAFE" }
      >
    >
  >
>;
type Delay = Prettify<
  EnhanceRefs<
    RealBigints<
      Extract<
        ApplyConstellationPayload["specification"][number],
        { type: "DELAY" }
      >
    >
  >
>;
type Roles = Prettify<
  EnhanceRefs<
    RealBigints<
      Omit<
        Extract<
          ApplyConstellationPayload["specification"][number],
          { type: "ROLES" }
        >,
        "roles"
      >
    >
  > & { roles: { [key: string]: Role | null } }
>;

export type Node = Safe | Delay | Roles;
export type Specification = Node[];
