import { AccountType, chains, NewAccount, UpdateAccount } from "ser-kit";
import { Account } from "./types";

const enumAccountTypes = {
  SAFE: AccountType.SAFE,
  ROLES: AccountType.ROLES,
  DELAY: AccountType.DELAY,
} as const;

export const mapAccount = (account: Account) => {
  const chain = chains.find((chain) => chain.shortName === account.chain);
  if (!chain) {
    throw new Error(`Chain ${account.chain} not found`);
  }

  return {
    ...account,
    type: enumAccountTypes[account.type],
    chain: chain.chainId,
  } as NewAccount | UpdateAccount;
};
