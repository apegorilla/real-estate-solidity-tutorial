// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract RealEstate {
    struct Buyer {
        address buyAddress;
        string name;
        uint age;
    }

    mapping (uint => Buyer) public buyerInfo;
    address public owner;
    address[10] public buyers;

    event LogBuyRealEstate(
        address _buyer,
        uint _id
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    function buyRealEstate(uint _id, string memory _name, uint _age) public payable {
        require(_id >= 0 && _id <= 9);
        buyers[_id] = msg.sender;
        buyerInfo[_id] = Buyer(msg.sender, _name, _age);

        payable(owner).transfer(msg.value);
        emit LogBuyRealEstate(msg.sender, _id);
    }
}
