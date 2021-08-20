const AdMonkeyMigration = artifacts.require("AdMonkeyMigration");

module.exports = function(deployer, network, accounts) {
  const userAddress = accounts[3];
  const userAddress2 = accounts[5];
  deployer.deploy(AdMonkeyMigration,userAddress, userAddress2);
};
