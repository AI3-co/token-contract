//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract AI3C is ERC20, ERC20Burnable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
	address owner;

    constructor() ERC20("Ai3.co", "AI3C") {
        _mint(msg.sender, 10_000_000 * 1e18);
		owner = msg.sender;
    }

    function mint(address _to, uint256 _amount) external {
		require(owner == msg.sender);
        _mint(_to, _amount);
    }

	function setOwner(address newOwner) external {
		require(owner == msg.sender);
		owner = newOwner;
	}
}
