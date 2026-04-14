#!/usr/bin/env bun
import fs from "node:fs";
import contracts from "../../contracts";
import { abiFilePath, walkContracts } from "../allow/abi";
import { writeAbi } from "../allow/abi";
import { fetchAbiForPrefix } from "../allow/fetch";
import { generateAllowTypes, writeGenerated } from "../allow/codegen";
import { chainIdFor } from "../allow/networks";

type Status = "ok" | "fetched" | "missing";

async function main() {
  let missing = 0;
  let fetched = 0;
  let existing = 0;

  for (const node of walkContracts(contracts as any)) {
    const file = abiFilePath(node);
    if (fs.existsSync(file)) {
      existing++;
      report(node.chain, node.segments, node.address, "ok", file);
      continue;
    }

    let chainId: number;
    try {
      chainId = chainIdFor(node.chain);
    } catch (error) {
      missing++;
      report(
        node.chain,
        node.segments,
        node.address,
        "missing",
        file,
        (error as Error).message,
      );
      continue;
    }

    const abi = await fetchAbiForPrefix(node.chain as any, node.address);
    if (!abi) {
      missing++;
      report(
        node.chain,
        node.segments,
        node.address,
        "missing",
        file,
        `api.abi.pub returned no ABI for chain ${chainId}`,
      );
      continue;
    }
    writeAbi(node, abi);
    fetched++;
    report(node.chain, node.segments, node.address, "fetched", file);
  }

  console.log("");
  console.log(
    `Setup summary: ${existing} existing, ${fetched} fetched, ${missing} missing.`,
  );
  if (missing > 0) {
    console.log("");
    console.log("Missing ABIs must be provided manually. Paste the contract");
    console.log("ABI JSON at the paths listed above and re-run `bun run setup`.");
  }

  const source = generateAllowTypes(contracts as any);
  writeGenerated(source);
  console.log("");
  console.log("Wrote typings to .lib/generated/allow.d.ts");

  if (missing > 0) process.exit(1);
}

function report(
  chain: string,
  segments: string[],
  address: string,
  status: Status,
  file: string,
  reason?: string,
) {
  const label = `${chain}.${segments.join(".")}`.padEnd(40, " ");
  const tag = {
    ok: "  cached  ",
    fetched: "  fetched ",
    missing: "  MISSING ",
  }[status];
  const suffix = reason ? ` — ${reason}` : "";
  console.log(`${tag} ${label} ${address}${suffix}`);
  if (status === "missing") {
    console.log(`            → paste ABI at ${file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
