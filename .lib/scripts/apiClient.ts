import { ApiClient } from "@zodiac-os/sdk";
import assert from "assert";

const { WORKSPACE_ID, ZODIAC_API_KEY } = process.env;

assert(
  WORKSPACE_ID,
  "WORKSPACE_ID env variable is required. Create a .env file in the root of the project based on the .env.template file.",
);
assert(
  ZODIAC_API_KEY,
  "ZODIAC_API_KEY env variable is required. Create a .env file in the root of the project based on the .env.template file.",
);

export const apiClient = new ApiClient({
  apiKey: ZODIAC_API_KEY,
  workspace: WORKSPACE_ID,
  baseUrl: "http://localhost:3040/api/v1",
});
