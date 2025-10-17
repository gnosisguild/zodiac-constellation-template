const safe = ref("safe", { type: "SAFE", chain: "sep" });
const roles = ref("roles", { type: "ROLES", chain: "sep" });
const s = safe({
  nonce: 0n,
  address: "0x0000000000000000000000000000000000000000",
  threshold: 1,
  owners: [],
  modules: [],
});
export default [
  safe({
    nonce: 0n,
    threshold: 1,
    owners: [roles],
    modules: [],
  }),

  roles({
    nonce: 0n,
    owner: safe,
    target: safe,
    avatar: safe,
    roles: ["myRoles"],
  }),
] satisfies Specification;
