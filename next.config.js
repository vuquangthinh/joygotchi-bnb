/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      CHAIN_ID: 5611,
      CHAIN_NAME: "opBNB Testnet",
      CHAIN_NETWORK: "opBNB",
      TOKEN: "BNB",
      SYMBOL: "tBNB",
      RPC: "https://opbnb-testnet-rpc.bnbchain.org",
      URL_FAUCET: "https://opbnb-testnet-bridge.bnbchain.org/deposit",
      NFT_ADDRESS:'0x6Ed360D1D320E55E7Cb1e7c3a4D4476dBa8E6740',
      TOKEN_ADDRESS:'0xFcC9665bc183A899994E7793ecA500947D67134c',
      FAUCET_ADDRESS:'0xE94859c241eF396263fC9C9CBC43e9EC2656694D',
      DAO_ADDRESS:'0xCF0721c0b51ACe51B80D35cD3628c58eb5A06499',
      EXPLORER_URL:'https://op-bnb-mainnet-explorer-api.nodereal.io'
    },
}

module.exports = nextConfig