// const {
//     Contract,
//     ContractFactory,
//     utils,
//     BigNumber,
//     constants,
//     getSigners,
// } = require("ethers");
// const { ethers } = require("hardhat");

// async function main() {
//     const [deployer] = await ethers.getSigners();

//     console.log("Deploying contracts with the account:", deployer.address);

//     const VICNFT = await ethers.getContractFactory("VICNFT");
//     const vicNFT = await VICNFT.deploy({
//         gasLimit: "0x1000000",
//     });
//     await vicNFT.waitForDeployment();

//     const GameManager = await ethers.getContractFactory("GameManager");
//     const gameManager = await GameManager.deploy(vicNFT.target, {
//         gasLimit: "0x1000000",
//     });
//     await gameManager.waitForDeployment();

//     console.log("Settings");
//     await vicNFT.setGameManager(gameManager.target, {
//         gasLimit: "0x1000000",
//     });

//     console.log("ModeNFT:", vicNFT.target);
//     console.log("GameManager:", gameManager.target);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
} = require("ethers");
const { ethers } = require("hardhat");

const ROUTER_ADDRESS = "0xf70a84F179Ce0231Ef739AcfEffCf191F44a65b2"; //testnet

async function main() {
    const [deployer] = await ethers.getSigners();
    let nonce = await deployer.getNonce();

    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory("JoyGotchiTokenVIC");
    const token = await Token.deploy(ROUTER_ADDRESS, {
        gasLimit: "0x1000000",
        nonce: nonce,
    });
    await token.waitForDeployment();
    console.log("JoyGotchiToken:", token.target);
    nonce += 1;

    const ModeNFT = await ethers.getContractFactory("JoyGotchiVIC");
    const modeNFT = await ModeNFT.deploy(token.target, {
        gasLimit: "0x1000000",
        nonce: nonce,
    });
    await modeNFT.waitForDeployment();
    console.log("JoyGotchi:", modeNFT.target);
    nonce += 1;

    const GameManager = await ethers.getContractFactory("GameManagerVIC");
    const gameManager = await GameManager.deploy(modeNFT.target, {
        gasLimit: "0x1000000",
        nonce,
    });
    await gameManager.waitForDeployment();
    console.log("GameManager:", gameManager.target);
    nonce += 1;

    const Faucet = await ethers.getContractFactory("JoyGotchiFaucet");
    const faucet = await Faucet.deploy(token.target, {
        gasLimit: "0x1000000",
        nonce,
    });
    await faucet.waitForDeployment();
    console.log("Faucet:", faucet.target);
    nonce += 1;

    console.log("Settings");
    await modeNFT.setGameManager(gameManager.target, {
        gasLimit: "0x1000000",
        nonce,
    });
    nonce += 1;

    await token.transfer(faucet.target, ethers.parseEther("100000"), {
        gasLimit: "0x1000000",
        nonce,
    }); // move 100k to faucet
    // await token.enableTrading();

    console.log("Done");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
