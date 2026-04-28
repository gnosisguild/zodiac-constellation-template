import { backend_operator } from "./roles";
import { usdm_user_payouts } from "./allowances";

const mega = constellation({
  workspace: "Default workspace",
  label: "Backend Operator",
  chain: 4326,
});

const backendSafe = mega.safe["Backend Safe"]({
  nonce: 0n,
  threshold: 1,
  owners: [
    "0x091a5550689EAf68d15e176D5e6Fe063e105Bdaf",
    "0x325b8aB1BD08FbA28332796e6e4e979Fc3776BA9",
  ],
});

const backendRoles = mega.roles["Backend Safe Roles"]({
  nonce: 0n,
  owner: backendSafe,
  target: backendSafe,
  avatar: backendSafe,
  roles: { backend_operator },
  allowances: { usdm_user_payouts },
});

export { backendSafe, backendRoles };
