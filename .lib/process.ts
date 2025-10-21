import { ApplyConstellationPayload } from "@zodiac-os/api-types";
import assert from "assert";
import { Node, NodeWithRefsResolved, Ref, Role, Specification } from "./types";

/** Processes the specification so that it ready to be sent to the Zodiac OS API */
export const processSpecification = async (
  specification: Specification,
): ApplyConstellationPayload["specification"] => {
  specification = resolveRefs(specification);
};

const resolveRefs = (specification: Specification): NodeWithRefsResolved[] => {
  return specification.map((node) => {
    switch (node.type) {
      case "SAFE":
        return {
          ...node,
          owners: node.owners?.map((owner) => resolveRef(owner)),
          modules: node.modules?.map((module) => resolveRef(module)),
        };
      case "DELAY":
        return {
          ...node,
          owner: resolveRef(node.owner),
          target: resolveRef(node.target),
          avatar: resolveRef(node.avatar),
          modules: node.modules?.map(resolveRef),
        };
      case "ROLES":
        return {
          ...node,
          owner: resolveRef(node.owner),
          target: resolveRef(node.target),
          avatar: resolveRef(node.avatar),
          roles: Object.fromEntries(
            Object.entries(node.roles).map(
              ([key, role]: [string, Role | null]) => [
                key,
                role && {
                  ...role,
                  members: role.members.map(resolveRef),
                },
              ],
            ),
          ),
        };
    }
  });
};

const resolveRef = <
  T extends
    | Ref
    | { ref: Lowercase<string> }
    | `0x${string}`
    | `$${Lowercase<string>}`
    | undefined,
>(
  ref: T,
): T extends `0x${string}` | undefined ? T : `$${Lowercase<string>}` => {
  const assertLowerCase = (str: string) => {
    assert(
      str.toLowerCase() === str,
      `Ref must be all lower-case, but is not: ${str}`,
    );
  };

  // If it's an address, undefined or null, it's not a ref
  if ((typeof ref === "string" && ref.startsWith("0x")) || ref === undefined) {
    return ref as any;
  }

  // If it's a string starting with $, it's already a resolved ref
  if (typeof ref === "string" && ref.startsWith("$")) {
    assertLowerCase(ref);
    return ref as any;
  }

  // If the ref is an object, it means it's a complete node
  if (typeof ref === "object" && "ref" in ref) {
    assertLowerCase(ref.ref);
    return `$${ref.ref}` as any;
  }

  // Otherwise, it's a function that will return a partial node with the ref
  if (typeof ref === "function") {
    const stub = ref({});
    assertLowerCase(stub.ref);
    return `$${stub.ref}` as any;
  }

  throw new Error("Invalid ref");
};
