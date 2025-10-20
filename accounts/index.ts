import { eth_wrapping } from "../roles";

const safe = ref("safe", { type: "SAFE", chain: "sep" });
const roles = ref("roles", { type: "ROLES", chain: "sep" });

export default [
  safe({
    nonce: 0n,
    threshold: 1,
    owners: [],
    modules: [roles],
  }),

  roles({
    nonce: 0n,
    owner: safe,
    target: safe,
    avatar: safe,
    roles: { eth_wrapping },
  }),
] satisfies Specification;
