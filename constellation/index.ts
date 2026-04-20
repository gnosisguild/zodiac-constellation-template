import { backend_operator } from "./roles";
import { usdm_user_payouts } from "./allowances";

const gno = constellation({
  workspace: "Default workspace",
  label: "Backend Operator",
  chain: 100,
});

const backendSafe = gno.safe["Backend Safe"]({
  threshold: 1,
  owners: ["0x091a5550689EAf68d15e176D5e6Fe063e105Bdaf"],
  modules: [gno.roles["Backend Safe"]],
  vault: true,
});

const backendRoles = gno.roles["Backend Safe"]({
  roles: { backend_operator },
  allowances: { usdm_user_payouts },
});

export { backendSafe, backendRoles };
