const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
} = require("ethers");
const { ethers } = require("hardhat");

const ROUTER_ADDRESS = "0xb7d49ce9e7df8604c71d53501ecc81fcedcf9396";

const FEE_SHARING_ADDRESS = "0xBBd707815a7F7eb6897C7686274AFabd7B579Ff6";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory("FrenPetToken");
    const token = await Token.deploy(ROUTER_ADDRESS);
    await token.waitForDeployment();

    const ModeNFT = await ethers.getContractFactory("ModeNFT");
    const modeNFT = await ModeNFT.deploy(token.target);
    await modeNFT.waitForDeployment();

    const GameManager = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManager.deploy(modeNFT.target);
    await gameManager.waitForDeployment();

    console.log("Settings");
    await modeNFT.setGameManager(gameManager.target);
    await modeNFT.registerFeeSharing(FEE_SHARING_ADDRESS);
    await token.registerFeeSharing(FEE_SHARING_ADDRESS);

    console.log("Token:", token.target);
    console.log("ModeNFT:", modeNFT.target);
    console.log("GameManager:", gameManager.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
