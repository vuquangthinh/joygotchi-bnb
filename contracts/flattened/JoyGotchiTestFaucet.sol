// Sources flattened with hardhat v2.19.2 https://hardhat.org

// SPDX-License-Identifier: MIT

// File contracts/JoyGotchiTestFaucet.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.17;
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract JoyGotchiFaucet {
    IERC20 public token;
    address _owner;
    bool _isActive;

    constructor(address _token) {
        token = IERC20(_token);
        _owner = msg.sender;
        _isActive = true;
    }

    function getJoy(address _to) external {
        require(_isActive, "Faucet is not active");
        token.transfer(_to, 2000 ether);
    }

    function withdrawAll(address _to) external {
        require(msg.sender == _owner, "Only owner can withdraw");
        token.transfer(_to, token.balanceOf(address(this)));
    }

    function toggleActive() external {
        require(msg.sender == _owner, "Only owner can toggle");
        _isActive = !_isActive;
    }
}
