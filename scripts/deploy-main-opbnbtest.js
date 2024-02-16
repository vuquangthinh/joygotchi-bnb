const {
    Contract,
    ContractFactory,
    utils,
    BigNumber,
    constants,
    getSigners,
} = require("ethers");
const { ethers } = require("hardhat");

const ROUTER_ADDRESS = ethers.ZeroAddress; //"0x5072EA8551efBF96Ad87050563e6BA197A03f34d"; //testnet

async function main() {
    const [deployer] = await ethers.getSigners();
    let nonce = await deployer.getNonce();

    console.log("Deploying contracts with the account:", deployer.address);

    // const Token = await ethers.getContractFactory("JoyGotchiToken");
    // const token = await Token.deploy(ROUTER_ADDRESS);
    // await token.waitForDeployment();
    // console.log("JoyGotchiToken:", token.target);

    // const ModeNFT = await ethers.getContractFactory("JoyGotchiV2");
    // const modeNFT = await ModeNFT.deploy(token.target);
    // await modeNFT.waitForDeployment();
    // console.log("JoyGotchi:", modeNFT.target);

    // const GameManager = await ethers.getContractFactory("GameManagerV2");
    // const gameManager = await GameManager.deploy(modeNFT.target);
    // await gameManager.waitForDeployment();
    // console.log("GameManager:", gameManager.target);

    // const GenePool = await ethers.getContractFactory("GenePool");
    // const genePool = await GenePool.deploy(
    //     modeNFT.target,
    //     2, 2, 2, 2);
    // await genePool.waitForDeployment();
    // console.log("GenePool:", genePool.target);

    // const Faucet = await ethers.getContractFactory("JoyGotchiFaucet");
    // const faucet = await Faucet.deploy(token.target);
    // await faucet.waitForDeployment();
    // console.log("Faucet:", faucet.target);

    // JoyGotchiToken: 0xFcC9665bc183A899994E7793ecA500947D67134c
    // JoyGotchi: 0x6Ed360D1D320E55E7Cb1e7c3a4D4476dBa8E6740
    // GameManager: 0xAC4fBfb9765218E6322f86E964c75B7975CB48A5
    // GenePool: 0xBB064BEDe0f63099626BAeD88098D97e207e2428
    // Faucet: 0xE94859c241eF396263fC9C9CBC43e9EC2656694D
    // DAO: 0xCF0721c0b51ACe51B80D35cD3628c58eb5A06499
    const token = await ethers.getContractAt('JoyGotchiToken', '0xFcC9665bc183A899994E7793ecA500947D67134c');
    const modeNFT = await ethers.getContractAt('JoyGotchiV2', '0x6Ed360D1D320E55E7Cb1e7c3a4D4476dBa8E6740');
    const gameManager = await ethers.getContractAt('GameManagerV2', '0xAC4fBfb9765218E6322f86E964c75B7975CB48A5');
    const faucet = await ethers.getContractAt('JoyGotchiFaucet', '0xE94859c241eF396263fC9C9CBC43e9EC2656694D');

    console.log("Settings");
    await modeNFT.setGameManager(gameManager.target);

    await modeNFT.setGenePool(gameManager.target);

    await token.transfer(faucet.target, ethers.parseEther("100000")); // move 100k to faucet

    await token.enableTrading();
    // enable trading

    const DAO = await ethers.getContractFactory('DAO');
    const dao = await DAO.deploy(
        '0xa07445899cB686F304a89bBC3AEbE93Ae78eBeeB',
        await token.getAddress(),
        ethers.parseEther('0.01'), // "1%"
    );
    await dao.waitForDeployment();
    console.log("DAO:", dao.target);

    console.log("Done");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
