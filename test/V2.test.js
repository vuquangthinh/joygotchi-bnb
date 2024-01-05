const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { parseEther, MaxInt256 } = require("ethers");

describe("V2", function () {
    async function deployContracts() {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy();

        const NFT = await ethers.getContractFactory("JoyGotchiV2");
        const nft = await NFT.deploy(token.target);

        const GameManager = await ethers.getContractFactory("GameManagerV2");
        const gameManager = await GameManager.deploy(nft.target);

        const GenePool = await ethers.getContractFactory("GenePool");
        const genePool = await GenePool.deploy(nft.target);

        await nft.setGameManager(gameManager.target);
        await nft.setGenePool(genePool.target);

        return {
            token,
            nft,
        };
    }

    describe("Create NFT", function () {
        it("Shoud Create Species & Mint", async function () {
            const [owner, user1] = await ethers.getSigners();

            const { token, nft } = await loadFixture(deployContracts);

            await nft.createSpecies(
                [
                    ["image-link-1", "0-evo0", 20, 10],
                    ["image-link-2", "0-evo1", 25, 20],
                    ["image-link-3", "0-evo2", 35, 0],
                ],
                10
            );

            await nft.createSpecies(
                [
                    ["image-link-1", "1-evo0", 20, 10],
                    ["image-link-2", "1-evo1", 25, 20],
                    ["image-link-3", "1-evo2", 35, 0],
                ],
                10
            );

            const species = await nft.speciesList(0);

            console.log({ species });

            const evo0 = await nft.speciesToEvolutions(0, 0);
            const evo1 = await nft.speciesToEvolutions(0, 1);
            const evo2 = await nft.speciesToEvolutions(0, 2);

            console.log({
                evo0,
                evo1,
                evo2,
            });

            await token.transfer(user1, parseEther("20000"));

            await token.connect(user1).approve(nft.target, MaxInt256);

            let type0Count = 0;
            let type1Count = 0;

            for (let i = 0; i < 10; i++) {
                await nft.connect(user1).mint();

                const species = await nft.petSpecies(i);

                if (species === 0n) type0Count++;
                if (species === 1n) type1Count++;
            }

            console.log({ type0Count, type1Count });

            expect(await nft.balanceOf(user1.address)).to.equal(10);
        });
    });

    describe("Item", function () {
        it("Shoud Create Item", async function () {
            const [owner] = await ethers.getSigners();

            const { token, nft } = await loadFixture(deployContracts);

            expect(
                await nft.createItem("HEROINE", parseEther("100"), 1000, 86400)
            )
                .to.emit(nft, "ItemCreated")
                .withArgs(0, "HEROINE", parseEther("100"), 1000, 86400);
        });

        it("Shoud Buy Item", async function () {
            const [owner, user1] = await ethers.getSigners();

            const { token, nft } = await loadFixture(deployContracts);

            await nft.createSpecies(
                [
                    ["image-link-1", "0-evo0", 20, 10],
                    ["image-link-2", "0-evo1", 25, 20],
                    ["image-link-3", "0-evo2", 35, 0],
                ],
                10
            );

            await token.transfer(user1, parseEther("3000"));

            await token.connect(user1).approve(nft.target, MaxInt256);

            await nft.connect(user1).mint();

            await nft.createItem("HEROINE", parseEther("100"), 1000, 864000);

            await nft.connect(user1).buyAccessory(0, 0);
        });
    });

    describe("Gameplay", function () {
        it("Should attack", async function () {
            const [owner, user1, user2] = await ethers.getSigners();
            const { token, nft } = await loadFixture(deployContracts);

            await nft.createSpecies(
                [
                    ["image-link-1", "0-evo0", 20, 10],
                    ["image-link-2", "0-evo1", 25, 20],
                    ["image-link-3", "0-evo2", 35, 0],
                ],
                10
            );

            await token.transfer(user1, parseEther("3000"));
            await token.transfer(user2, parseEther("2000"));

            await token.connect(user1).approve(nft.target, MaxInt256);
            await token.connect(user2).approve(nft.target, MaxInt256);

            await nft.connect(user1).mint();
            await nft.connect(user2).mint();

            await nft.createItem(
                "HEROINE",
                parseEther("100"),
                parseEther("1"),
                864000
            );

            await nft.connect(user1).buyAccessory(0, 0);

            await nft.connect(user2).attack(1, 0);
        });

        it("Should Evolve", async function () {
            const [owner, user1, user2] = await ethers.getSigners();
            const { token, nft } = await loadFixture(deployContracts);

            await nft.createSpecies(
                [
                    ["image-link-1", "0-evo0", 20, 10],
                    ["image-link-2", "0-evo1", 25, 20],
                    ["image-link-3", "0-evo2", 35, 0],
                ],
                10
            );

            await token.transfer(user1, parseEther("3000"));

            await token.connect(user1).approve(nft.target, MaxInt256);

            await nft.connect(user1).mint();

            const evo1Info = await nft.getPetEvolutionInfo(0);

            console.log({ evo1Info });

            await nft.createItem(
                "HEROINE",
                parseEther("100"),
                parseEther("1"),
                864000
            );

            await nft.connect(user1).buyAccessory(0, 0);

            await nft.connect(user1).evolve(0);

            const evo2Info = await nft.getPetEvolutionInfo(0);

            console.log({ evo2Info });

            await nft.connect(user1).evolve(0);

            const evo3Info = await nft.getPetEvolutionInfo(0);

            console.log({ evo3Info });

            const uri = await nft.tokenURI(0);

            console.log({ uri });
        });
    });
});
