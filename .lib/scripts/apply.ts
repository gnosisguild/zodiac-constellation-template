#!/usr/bin/env bun
import "dotenv/config";
import "../globals";
import assert from "assert";
import open from "open";
import yargs from "yargs";
import path from "path";
import { processSpecification } from "../process";
import { getGitOrigin } from "../source";
import { apiClient } from "./apiClient";

async function main() {
  const defaultEntrypoint = "accounts/index.ts";

  const args = await yargs(process.argv.slice(2))
    .usage("$0 <entrypoint>")
    .positional("entrypoint", {
      default: defaultEntrypoint,
      describe: "The Zodiac OS workspace ID to apply the constellation to",
      type: "string",
    }).argv;

  const [entrypoint = defaultEntrypoint] = args._ as [string];

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

  const specification = await processSpecification(module.default);

  const { url } = await apiClient.applyConstellation({
    specification,
    label: "",
    source: getGitOrigin(),
  });

  console.log(`Apply constellation at: ${url}`);
  open(url);
}

main();
