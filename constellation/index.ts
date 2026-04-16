import { backend_operator } from "./roles";
import { usdm_user_payouts } from "./allowances";

const mega = constellation({
  workspace: "testing",
  label: "Backend Operator",
  chain: 4326, // megaeth
});

const backendSafe = mega.safe["Backend Safe"]({
  nonce: 0n,
  threshold: 1,
  owners: ["0x325b8aB1BD08FbA28332796e6e4e979Fc3776BA9"],
  modules: [mega.roles["Backend Safe"]],
});

const backendRoles = mega.roles["Backend Safe"]({
  roles: { backend_operator },
  allowances: [usdm_user_payouts],
  // TODO this shall become:
  // allowances: { usdm_user_payouts },
});

export { backendSafe, backendRoles };
