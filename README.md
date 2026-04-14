# Zodiac OS Constellation Template

A ready-to-use starting point for managing Zodiac account constellations as code.

## Getting started

1. Generate a Zodiac OS API key
2. Copy `.env.template` to `.env` and fill in your credentials
3. `bun install`
4. `bun setup` (fetches contract ABIs, generates types)
5. Edit `accounts/index.ts` to define your constellation
6. `bun apply` to deploy

## Workflow

Defining a constellation is three steps:

### 1. Define account structure — `accounts/index.ts`

Declare Safes, roles mods, and delay mods using the `constellation()` entrypoint. Existing accounts from your Zodiac OS workspace are available via bracket access (`eth.safe["GG DAO"]`); new accounts are created via direct calls (`eth.safe({...})`). Only nodes you `export` end up in the constellation.

### 2. Define role members — `roles/<role>/members.ts`

Each role directory exports an array of member addresses:

```ts
export default [
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
] satisfies `0x${string}`[];
```

### 3. Define role permissions — `roles/<role>/permissions.ts`

Collect the contract addresses your role interacts with in `contracts.ts`, then express permissions via the `allow` kit (or `defi-kit` for preset actions):

```ts
export default [
  allow.arb1.weth.deposit({ send: true }),
  allow.arb1.weth.withdraw(),
] satisfies Permissions;
```

## Managing contract addresses

All contract addresses live in `contracts.ts`, keyed by chain prefix (`eth`, `arb1`, `gno`, …) and a nested path:

```ts
export default {
  eth: {
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    uniswap: {
      positions_nft: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    },
  },
} satisfies ContractsConfig;
```

Every time you add, remove, or rename an entry in `contracts.ts`, **re-run `bun setup`**. It:

- fetches the ABI and saves it under `abis/<chain>/<path>.json`
- regenerates the typings at `.lib/generated/allow.d.ts` so `allow.<chain>.<path>.<fn>` autocompletes with named parameters

If a contract isn't verified or its ABI cannot be fetched, setup prints the file path where to paste the ABI JSON manually, then re-run `bun setup`.

> **VS Code tip:** if autocomplete doesn't reflect your changes immediately, restart the TypeScript server (`Cmd+Shift+P` → "TypeScript: Restart TS Server"). The generated `.d.ts` is only re-read on restart.

## Commands

| Command | What it does |
| --- | --- |
| `bun setup` | Fetch missing ABIs and regenerate the `allow` kit types |
| `bun apply` | Deploy the constellation defined in `accounts/index.ts` |
| `bun format` | Prettier across the repo |
