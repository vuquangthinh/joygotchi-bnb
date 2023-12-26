const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
} = require("ethers");
const { ethers } = require("hardhat");

const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const pairArtifact = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");

const ROUTER_ADDRESS = "0x5D1942345D63562fD38d17C28Dcd22e7b3E9Cfb4";

async function main() {
    const [deployer] = await ethers.getSigners();

    const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, deployer);

    const factoryAddress = await router.WETH();

    console.log("Factory:", factoryAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
