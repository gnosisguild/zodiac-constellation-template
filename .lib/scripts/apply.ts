#!/usr/bin/env bun
import assert from "assert";
import open from "open";
import yargs from "yargs";
import { ApiClient } from "@zodiac-os/sdk";
import "../globals";

async function main() {
  const args = await yargs(process.argv.slice(2))
    .usage("$0 <workspace>")
    .positional("workspace", {
      demandOption: true,
      describe: "The Zodiac OS workspace ID to apply the constellation to",
      type: "string",
    }).argv;

  const [workspaceId] = args._ as [string];

  // const permissions: Permissions = (
  //   await import(`../../roles/${roleArg}/permissions`)
  // ).default;

  // const members: `0x${string}`[] = (
  //   await import(`../../roles/${roleArg}/members`)
  // ).default;

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
