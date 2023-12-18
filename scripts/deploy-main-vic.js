const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
} = require("ethers");
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const VICNFT = await ethers.getContractFactory("VICNFT");
    const vicNFT = await VICNFT.deploy({ gasLimit: "0x1000000", nonce: 5 });
    await vicNFT.waitForDeployment();

    const GameManager = await ethers.getContractFactory("GameManager");
    const gameManager = await GameManager.deploy(vicNFT.target, {
        gasLimit: "0x1000000",
        nonce: 6,
    });
    await gameManager.waitForDeployment();

    console.log("Settings");
    await vicNFT.setGameManager(gameManager.target, {
        gasLimit: "0x1000000",
        nonce: 7,
    });

    console.log("ModeNFT:", vicNFT.target);
    console.log("GameManager:", gameManager.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
