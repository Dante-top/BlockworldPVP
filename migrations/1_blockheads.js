const BlockHeads = artifacts.require("BlockHeads");

module.exports = function (deployer) {
  deployer.deploy(BlockHeads, "https://ipfs.io/ipfs/QmVA6bXEXzpotomKcG5dE7tj2wtXcwdPUJAgenc5BnQvT6/");
};
