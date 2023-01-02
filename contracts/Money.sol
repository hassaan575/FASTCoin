pragma solidity ^0.8.17;

// SPDX-License-Identifier: MIT

contract Money {
    // 0x5da69516c0255c676817AAd02c686ecB101D0E33
    address public owner;
    uint256 private balance;
    struct trasaction {
        address wallet;
        string status;
        uint256 value;
    }

    //	    trasaction[] public trasactionData;
    mapping(uint256 => trasaction) private trasactionData;
    uint256 nextTransId = 0;

    constructor() {
        owner = msg.sender; // store information who deployed contract
    }

    receive() external payable {
        balance += msg.value; // keep track of balance (in WEI)
        //			trasactionData.push(trasaction(msg.sender, "paid" , msg.value));
        trasactionData[nextTransId] = trasaction(msg.sender, "paid", msg.value);
        nextTransId++;
    }

    function getbalance() public view returns (uint256) {
        return balance;
    }

    function withdraw(uint256 amount, address payable destAddr) public payable {
        require(msg.sender == owner, "Only owner can withdraw");
        require(amount <= balance, "Insufficient funds");

        destAddr.transfer(amount); // send funds to given address
        balance -= amount;

        //trasactionData.push(trasaction(destAddr, "withdraw" , amount));
        trasactionData[nextTransId] = trasaction(destAddr, "withdraw", amount);
        nextTransId++;
    }

    function transLength() public view returns (uint256) {
        return nextTransId;
    }

    function getAllTrasaction(uint256 i)
        public
        view
        returns (trasaction memory)
    {
        return trasactionData[i];
    }

    /*		function getAllTrasaction() public view returns(address[] memory  , string[] memory  , uint256[] memory  ) {
			string[] memory status;
			address[] memory addr; 
			uint256[] memory amount;
			for(uint i  = 0; i < trasactionData.length ;  i++)
			{
				addr[i] = trasactionData[i].wallet;
				status[i] = trasactionData[i].status;
				amount[i] = trasactionData[i].value;
			}
			return(addr,status, amount);
			
		}
*/
    function getAddress() external view returns (address) {
        return address(this);
    }

    function returnowner () external view returns (address) {
            return owner;

    }
}
