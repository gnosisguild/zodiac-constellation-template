import { defineConfig } from "@zodiac-os/sdk/cli/config";
import contracts from "./contracts";

const apiKey = process.env.ZODIAC_API_KEY;
if (!apiKey?.startsWith("zodiac_")) {
  throw new Error(
    "ZODIAC_API_KEY is missing or invalid. Copy .env.template to .env and set it.",
  );
}

export default defineConfig({
  apiKey: apiKey as `zodiac_${string}`,
  contracts,
  abisDir: "abis",
});
