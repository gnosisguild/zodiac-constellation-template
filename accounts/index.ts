import { eth_wrapping } from "../roles";

const safe = ref("safe", { type: "SAFE", chain: "arb1" });
const roles = ref("roles", { type: "ROLES", chain: "arb1" });

export default [
  safe({
    nonce: 0n,
    threshold: 2,
    owners: [
      "0x06b2e1a976e97815a4563b5ee511bb1b2732e8ee",
      "0xb8e48df6818d3cbc648b3e8ec248a4f547135f7a",
    ],
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
