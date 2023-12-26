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

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    let nonce = await deployer.getNonce();

    const WETH = await ethers.getContractFactory("MockWETH");
    const weth = await WETH.deploy({ gasLimit: "0x1000000", nonce: nonce++ });
    await weth.waitForDeployment();

    const Factory = new ContractFactory(
        factoryArtifact.abi,
        factoryArtifact.bytecode,
        deployer
    );
    const factory = await Factory.deploy(deployer.address, {
        gasLimit: "0x1000000",
        nonce: nonce++,
    });
    await factory.waitForDeployment();

    const Router = new ContractFactory(
        routerArtifact.abi,
        routerArtifact.bytecode,
        deployer
    );
    const router = await Router.deploy(factory.target, weth.target, {
        gasLimit: "0x1000000",
        nonce: nonce++,
    });
    await router.waitForDeployment();

    console.log("WETH:", weth.target);
    console.log("Factory:", factory.target);
    console.log("Router:", router.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
