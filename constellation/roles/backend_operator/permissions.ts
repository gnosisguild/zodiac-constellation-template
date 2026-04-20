import { usdm_user_payouts } from "../../allowances";
import config from "../../../zodiac.config";

export default [
  // user payouts
  allow.megaeth.usdm.transfer(
    undefined, // any address allowed as recipient
    c.withinAllowance(usdm_user_payouts.key),
  ),

  // exchange interactions
  allow.megaeth.usdm.approve(config.contracts.megaeth.CompositeExchange),
  allow.megaeth.CompositeExchange.depositErc20(config.contracts.megaeth.usdm),
  allow.megaeth.CompositeExchange.withdrawErc20(config.contracts.megaeth.usdm),
  allow.megaeth.CompositeExchange.batchCommands(), // allow all trading commands
] satisfies Permissions;
