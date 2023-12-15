// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IFrenPet} from "./interfaces/IFrenPet.sol";

contract GameManager {
    IFrenPet public frenPet;

    constructor(IFrenPet _frenPet) {
        frenPet = _frenPet;
    }

    function onAttack(
        uint256 fromId,
        uint256 toId
    ) external view returns (uint256 pct, uint256 odds, bool canAttack) {
        require(
            block.timestamp >= frenPet.lastAttackUsed(fromId) + 15 minutes ||
                frenPet.lastAttackUsed(fromId) == 0,
            "You have one attack every 15 mins"
        );
        require(
            block.timestamp > frenPet.lastAttacked(toId) + 1 hours,
            "can be attacked once every hour"
        );

        require(
            frenPet.level(fromId) < frenPet.level(toId),
            "Only attack pets above your level"
        );

        pct = 5; //0.5%
        odds = 40; //40% odds for attacker as lower level
        canAttack = true; //can attack
    }

    function onBuyAccessory(
        uint256 fromId,
        uint256 itemId
    ) external view returns (bool shouldContinue) {
        return true;
    }
}