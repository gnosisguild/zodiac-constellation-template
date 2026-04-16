import { backend_operator } from "../roles";

const mega = constellation({
  workspace: "testing",
  label: "Backend Operator",
  chain: 4326, // megaeth
});

const backendSafe = mega.safe({
  label: "Backend Safe",
  nonce: 0n,
  threshold: 1,
  owners: ["0x325b8aB1BD08FbA28332796e6e4e979Fc3776BA9"],
  modules: [() => backendRoles],
});

const backendRoles = mega.roles({
  nonce: 0n,
  target: backendSafe,
  roles: { "backend-operator": backend_operator },
});

export { backendSafe, backendRoles };
