// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Disperse {
    address public owner;

    event DepositReceived(address sender, uint amount);
    event EtherDispersed(address recipient, uint amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    receive() external payable {
        emit DepositReceived(msg.sender, msg.value);
    }

    function disperseEvenly(address[] calldata recipients) external onlyOwner {
        require(recipients.length > 0, "No recipients provided");
        uint amountPerRecipient = address(this).balance / recipients.length;
        require(amountPerRecipient > 0, "Insufficient balance to disperse evenly");

        for (uint i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: amountPerRecipient}("");
            require(success, "Failed to send ETH");
            emit EtherDispersed(recipients[i], amountPerRecipient);
        }
    }

    function withdrawAll() public onlyOwner {
        uint balance = address(this).balance;
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Failed to withdraw ETH");
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
