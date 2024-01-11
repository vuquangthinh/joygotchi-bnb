// Sources flattened with hardhat v2.19.2 https://hardhat.org

// SPDX-License-Identifier: MIT

// File contracts/interfaces/IJoyGotchi.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.13;

interface IJoyGotchi {

    function lastAttackUsed(uint256 id) external view returns (uint256);

    function lastAttacked(uint256 id) external view returns (uint256);

    function level(uint256 id) external view returns (uint256);

    function score(uint256 id) external view returns (uint256);

    function getPetAttackWinrate(uint256 _nftId) external view returns (uint256);
}


// File contracts/GameManagerV2.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.13;

contract GameManagerV2 {
    IJoyGotchi public joyGotchi;

    constructor(IJoyGotchi _joyGotchi) {
        joyGotchi = _joyGotchi;
    }

    function onAttack(
        uint256 fromId,
        uint256 toId
    ) external view returns (uint256 pct, uint256 odds, bool canAttack) {
        require(
            block.timestamp >= joyGotchi.lastAttackUsed(fromId) + 15 minutes ||
                joyGotchi.lastAttackUsed(fromId) == 0,
            "You have one attack every 15 mins"
        );
        require(
            block.timestamp > joyGotchi.lastAttacked(toId) + 1 hours,
            "can be attacked once every hour"
        );

        require(
            joyGotchi.level(fromId) < joyGotchi.level(toId),
            "Only attack pets above your level"
        );

        pct = 5; //0.5%
        odds = joyGotchi.getPetAttackWinrate(fromId);
        canAttack = true; //can attack
    }

    function onBuyAccessory(
        uint256 fromId,
        uint256 itemId
    ) external view returns (bool shouldContinue) {
        return true;
    }
}
