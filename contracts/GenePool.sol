// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract GenePool {
    address public nft;
    uint256 public totalGeneNum;
    uint256 public speciesCount;

    struct spawnCondition{
        uint256 gte;
        uint256 lte;
    }

    mapping(uint256 => spawnCondition) public speciesToSpawnCondition;
    mapping(uint256 => bool) public isSpeciesGeneInitialized;


    constructor(
        address _joyGotchiNFT
    ) {
        nft = _joyGotchiNFT;
    }


    function addSpeciesToGenePool(uint _id, uint256 _geneNum)  external returns (uint256){
        require(msg.sender == nft, "Unauthorized");
        require(!isSpeciesGeneInitialized[_id], "Species already added");
        isSpeciesGeneInitialized[_id] = true;
        speciesToSpawnCondition[_id] = spawnCondition(totalGeneNum, totalGeneNum + _geneNum - 1);
        totalGeneNum += _geneNum;
        speciesCount++;
        return speciesCount;
    }

    function generateRandomGene(address _account, uint _nftId) external view returns (uint256) {
        require(msg.sender == nft, "Unauthorized");
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, _account, _nftId))) % totalGeneNum;
        for (uint256 i = 0; i < speciesCount; i++) {
            if (random >= speciesToSpawnCondition[i].gte && random <= speciesToSpawnCondition[i].lte) {
                return i;
            }
        }
        return 0;
    }

}