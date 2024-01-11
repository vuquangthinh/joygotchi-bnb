const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
} = require("ethers");
const { ethers } = require("hardhat");

const ROUTER_ADDRESS = "0xa95d4ca77153d67901927A698B2c04B895AA0923"; // aurora testnet

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory(
        "contracts/flattened/JoyGotchiToken.sol:JoyGotchiToken"
    );
    const token = await Token.deploy(ROUTER_ADDRESS);
    await token.waitForDeployment();
    console.log("JoyGotchiToken:", token.target);

    const ModeNFT = await ethers.getContractFactory(
        "contracts/flattened/JoyGotchiV2.sol:JoyGotchiV2"
    );
    const modeNFT = await ModeNFT.deploy(token.target);
    await modeNFT.waitForDeployment();
    console.log("JoyGotchi:", modeNFT.target);

    const GameManager = await ethers.getContractFactory(
        "contracts/flattened/GameManagerV2.sol:GameManagerV2"
    );
    const gameManager = await GameManager.deploy(modeNFT.target);
    await gameManager.waitForDeployment();
    console.log("GameManager:", gameManager.target);

    const GenePool = await ethers.getContractFactory(
        "contracts/flattened/GenePool.sol:GenePool"
    );
    const genePool = await GenePool.deploy(modeNFT.target);
    await genePool.waitForDeployment();
    console.log("GenePool:", genePool.target);

    const Faucet = await ethers.getContractFactory(
        "contracts/flattened/JoyGotchiTestFaucet.sol:JoyGotchiFaucet"
    );
    const faucet = await Faucet.deploy(token.target);
    await faucet.waitForDeployment();
    console.log("Faucet:", faucet.target);

    console.log("Settings");
    await modeNFT.setGameManager(gameManager.target);

    await modeNFT.setGenePool(gameManager.target);

    await token.transfer(faucet.target, ethers.parseEther("100000")); // move 100k to faucet

    await token.enableTrading();
    // enable trading

    console.log("Done");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
