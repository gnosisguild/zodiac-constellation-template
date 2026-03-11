import { eth_wrapping } from "../roles";

// there will be a typegen step, thats writes the entities that live in the connected Zodiac
// org into TS files, e.g. as objects that could look something like this:
const ZODIAC_SAFES = {
  "GG DAO": {
    address: "0x123...",
    vault: true,
  },
} as const;
const ZODIAC_USERS = {
  "jan@gnosisguild.org": {
    fullName: "Jan-Felix Schwarz",
    address: "0x123...",
  },
} as const;

// the SDK entrypoint `constellation()` is typed based on these typegen outputs
// Its return value allows accessing accounts (safe, roles, delay) for the constellation
const eth = constellation({
  workspace: "testing",
  label: "My Test",
  chain: 1,
});

// bracket access for existing accounts — autocompletes from typegen, returns a node reference
// for existing nodes, the call provides optional overrides (all props are already known)
const ggDao = eth.safe["GG DAO"]({
  vault: true, // override: start to show it as a vault
});

// bracket access for roles: referencing an existing Safe name gives the canonical Roles mod
// (target/owner/avatar = account, nonce derived from account)
// the call provides additional config (e.g. roles definitions)
const ggDaoRoles = eth.roles["GG DAO"]({
  roles: { eth_wrapping },
});

eth.policies["My existing policy"]({});

// eth.safe(...) with full config creates a new node — label is a prop, all required fields must be provided
// returns a node reference (not callable again)
const newSafe = eth.safe({
  label: "New Safe",
  nonce: 0n,
  threshold: 2,
  owners: [eth.user["Jan-Felix"], "0xb8e48df6818d3cbc648b3e8ec248a4f547135f7a"],
  modules: [ggDaoRoles],
});

// new roles mod via eth.roles(...)
const newRoles = eth.roles({
  nonce: 123n,
  target: ggDao,
  // owner: ggDao,  // defaults to target
  // avatar: ggDao,  // defaults to target
});

// existing safe without overrides — just reference it with no-arg call
const unmodifiedSafe = eth.safe["GG DAO"]();

// only explicitly exported nodes are included in the constellation (no registration side-effects)
export { ggDao, newSafe, ggDaoRoles, newRoles, unmodifiedSafe };
