#!/usr/bin/env bun
import "dotenv/config";
import "../globals";
import assert from "assert";
import open from "open";
import yargs from "yargs";
import { ApiClient } from "@zodiac-os/sdk";
import path from "path";

const { WORKSPACE_ID, ZODIAC_API_KEY } = process.env;

assert(
  WORKSPACE_ID,
  "WORKSPACE_ID env variable is required. Create a .env file in the root of the project based on the .env.template file.",
);
assert(
  ZODIAC_API_KEY,
  "ZODIAC_API_KEY env variable is required. Create a .env file in the root of the project based on the .env.template file.",
);

const apiClient = new ApiClient({
  apiKey: ZODIAC_API_KEY,
  workspace: WORKSPACE_ID,
});

async function main() {
  const args = await yargs(process.argv.slice(2))
    .usage("$0 <entrypoint>")
    .positional("entrypoint", {
      default: "accounts/index.ts",
      describe: "The Zodiac OS workspace ID to apply the constellation to",
      type: "string",
    }).argv;

  const [entrypoint] = args._ as [string];

  // Resolve the entrypoint path relative to the current working directory
  const resolvedPath = path.resolve(process.cwd(), entrypoint);
  const module = await import(resolvedPath);

  // Assert that the module has a default export which is an array
  assert(
    module.default,
    `Module at ${resolvedPath} must have a default export`,
  );
  assert(
    Array.isArray(module.default),
    `Default export from ${resolvedPath} must be an array`,
  );

  // const hash = await post(permissions, members);
  // console.log(`Permissions posted under hash: ${hash}`);

  // const diffUrl = `${ZODIAC_ROLES_APP}/${modArg}/roles/${roleArg}/diff/${hash}`;
  // console.log("Preparing diff view...");
  // await fetch(diffUrl);

  // let ownedBySafe = false;
  // const owner = modInfo && getAddress(modInfo.owner);
  // if (owner) {
  //   const safeService = new SafeApiKit({
  //     chainId: BigInt(chainId),
  //   });
  //   try {
  //     await safeService.getSafeInfo(owner);
  //     ownedBySafe = true;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // if (modInfo && ownedBySafe) {
  //   const safeUrl = `https://app.safe.global/apps/open?safe=${chainPrefix}:${owner}&appUrl=${encodeURIComponent(diffUrl)}`;
  //   console.log(`Proceed in Safe to apply: ${safeUrl}`);
  //   open(safeUrl);
  // } else {
  //   console.log(`Proceed in the Roles app to apply: ${diffUrl}`);
  //   open(diffUrl);
  // }
}

main();
