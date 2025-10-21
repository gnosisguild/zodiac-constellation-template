import { execSync } from "child_process";

/**
 * Gets the git origin URL from the current repository to use as source
 */
export function getGitOrigin() {
  try {
    return execSync("git config --get remote.origin.url", {
      encoding: "utf8",
    }).trim();
  } catch (error) {
    console.warn("Could not get git origin URL:", error);
    return undefined;
  }
}
