// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IModeFeeSharing} from "./interfaces/IModeFeeSharing.sol";

contract JoyGotchiTokenMode is ERC20,Ownable {
    constructor() ERC20("JoyGotchiToken", "JGT") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function registerFeeSharing(IModeFeeSharing feeSharing) external onlyOwner() returns (uint256) {
        return feeSharing.register(owner());
    }
}