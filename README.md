# Zodiac OS Constellation Template

A ready-to-use starting point for managing Zodiac account constellations as code

## Getting started

- Generate a Zodiac OS API key
- Create a .env file based on [.env.template]
- Run `bun i`, then `bun setup`
- Edit [accounts/index.ts] to define your desired account constellation
- Deploy the update by running `bun apply`

## Concepts

### Refs

In many cases, there will be circular references between accounts. The `ref` helper is useful for resolving these dependencies. It assigns a reference label to an account stub that typically defines the account type and chain. The returned reference can then be used anywhere this particular account needs to be referenced. Finally, the reference must be invoked with all missing configurations to produce the complete account entry for inclusion in the accounts specification.
