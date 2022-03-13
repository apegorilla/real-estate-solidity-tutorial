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
})