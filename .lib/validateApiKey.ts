export function validateApiKey(
  key: string | undefined,
): `zodiac_${string}` {
  if (!key?.startsWith("zodiac_")) {
    throw new Error(
      "ZODIAC_API_KEY is missing or invalid. Copy .env.template to .env and set it.",
    );
  }
  return key as `zodiac_${string}`;
}
