var RealEstate = artifacts.require('./RealEstate.sol');

contract('RealEstate', (accounts) => {
    let realEstateInstance;

    it("Initialization test", () => {
        return RealEstate.deployed().then((instance) => {
            realEstateInstance = instance;
            return realEstateInstance.owner.call();
        }).then((owner) => {
            assert.equal(owner.toUpperCase(), accounts[0].toUpperCase(), "owner is not the first account of ganache")
        })
    })

    it("Purchasing real estate id 0 via second ganache account and emit event, 'buyers' variable test", () => {
        return RealEstate.deployed().then((instance) => {
            realEstateInstance = instance;
            return realEstateInstance.buyRealEstate(0, "sejong", 13, { from: accounts[1], value: web3.utils.toWei('1.5', "ether")});
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, "Event is not created.");
            assert.equal(receipt.logs[0].event, "LogBuyRealEstate", "Event is not LogBuyRealEstate event");
            assert.equal(receipt.logs[0].args._buyer, accounts[1], "Buyer is not second ganache account");
            assert.equal(receipt.logs[0].args._id, 0, "Real estate's id is not 0");
            return realEstateInstance.getBuyerInfo(0);
        }).then((buyerInfo) => {
            assert.equal(buyerInfo[0].toUpperCase(), accounts[1].toUpperCase(), "Buyer's account is not second ganache account");
            assert.equal(buyerInfo[1], "sejong", "Buyer's name is not 'sejong'");
            assert.equal(buyerInfo[2], 13, "Buyer's age is not 13");
            return realEstateInstance.getAllBuyers();
        }).then((buyers) => {
            assert.equal(buyers[0].toUpperCase(), accounts[1].toUpperCase(), "The first index of 'buyers' is not second ganache account");
        })
    })
})