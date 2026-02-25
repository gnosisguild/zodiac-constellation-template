import { ContractsConfig } from "./.lib";

export default {
  arb1: {
    weth: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  },
  eth: {
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    uniswap: {
      positions_nft: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    },
  },
} satisfies ContractsConfig;
