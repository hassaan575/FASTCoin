const user = artifacts.require("./Data.sol");

module.exports = function(deployer) {
  deployer.deploy(user);
};
