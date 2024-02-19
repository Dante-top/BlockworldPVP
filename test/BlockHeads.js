const blockheads = artifacts.require("BlockHeads");
const truffleAssert = require('truffle-assertions');
const { assert, expect } = require("chai");
require('dotenv').config();
const Account = require('eth-lib/lib/account');
const ethereumjsUtil = require('ethereumjs-util');
const BN = require('bn.js');
require("chai")
  .use(require("chai-as-promised"))
  .should();
  
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("blockheads", function (accounts) {
  console.log(accounts);
  let contract;
  beforeEach('should setup the contract interface', async() => {
    contract = await blockheads.deployed();
  });

  describe('Contract Name and Symbol check', function(){
    it("should return BLOCKHEADS as contract name", async function (){
      const name = await contract.name();
      assert.equal(name, 'BLOCKHEADS');
    });

    it("should return BLOCKHEADS as contract symbol", async function (){
      const symbol = await contract.symbol();
      assert.equal(symbol, 'BLOCKHEADS');
    });
  });

  describe('Contract Owner check', function(){
    it("should return owner address as first account address", async function(){
      const owner = await contract.owner();
      assert.equal(owner, accounts[0]);
    })
  })

  describe('airdrop function', async () => {
    const tokenAmount = 3;
    const timestamp = parseInt(new Date().getTime() / 1000);
    const minterAddress = accounts[1];
    let signature;
    beforeEach(async () => {
      // Data Pack
      const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [minterAddress, tokenAmount, timestamp]
      );
      
      // Signature Generate
      const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
      const messageBytes = web3.utils.hexToBytes(messageHex);
      const messageBuffer = Buffer.from(messageBytes);
      const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
      signature = Account.sign(hash, process.env.PRIVATE_KEY);
    })

    it('should be reverted if airdrop is not active', async () => {
      await contract.claim(tokenAmount, timestamp, signature, { 'from': minterAddress }).should.be.rejected;
    })

    it('airdrop should work', async () => {
      await contract.toggleAirdropStatus()
      await contract.claim(tokenAmount, timestamp, signature, { 'from': minterAddress })
      const balance = await contract.balanceOf(minterAddress)
      assert.equal(balance, 3)
    })
  })

  describe('mint function check', function() {
    // Test mint datas
    const tokenAmount = 3;
    const timestamp = parseInt(new Date().getTime() / 1000);
    const minterAddress = accounts[2];
    before('initialize', async () => {
      await contract.toggleAirdropStatus()
    })

    it('should be reverted if non owner called togglePresale', async () => {
      await truffleAssert.reverts(contract.togglePresale({ 'from': minterAddress }));
    })

    it('togglePresale should work', async () => {
      await contract.togglePresale();
      const isPresaleStarted = await contract.isPresaleStarted();
      assert.equal(isPresaleStarted, true)
    })
    
    it('should be reverted if non owner called togglePublicSale', async () => {
      await truffleAssert.reverts(contract.togglePublicSale({ 'from': minterAddress }));
    })

    it('togglePublicSale should work', async () => {
      await contract.togglePublicSale();
      const isPublicsaleStarted = await contract.isPublicsaleStarted();
      assert.equal(isPublicsaleStarted, true)
    })

    it('should be reverted if price is not right', async () => {
      const isPresaleStarted = await contract.isPresaleStarted();
      assert.equal(isPresaleStarted, true)

      const price = await contract.price(1); 
      
      // Data Pack
      const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [minterAddress, tokenAmount, timestamp]
      );
      
      // Signature Generate
      const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
      const messageBytes = web3.utils.hexToBytes(messageHex);
      const messageBuffer = Buffer.from(messageBytes);
      const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
      const signature = Account.sign(hash, process.env.PRIVATE_KEY);
      // reverted if price is less than expected 
      await truffleAssert.reverts(contract.mint(tokenAmount, timestamp, signature, { 'from': minterAddress, 'value': price }));
    })

    it("should mint with correct signature", async function () {
      const isPresaleStarted = await contract.isPresaleStarted();
      assert.equal(isPresaleStarted, true)

      const price = await contract.price(tokenAmount);
      
      // Data Pack
      const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [minterAddress, tokenAmount, timestamp]
      );
      
      // Signature Generate
      const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
      const messageBytes = web3.utils.hexToBytes(messageHex);
      const messageBuffer = Buffer.from(messageBytes);
      const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
      const signature = Account.sign(hash, process.env.PRIVATE_KEY);

      await contract.mint(tokenAmount, timestamp, signature, { 'from': minterAddress, 'value': price });
      const bnTokens = await contract.walletOfOwner(accounts[1]);
      var tokens = [];
      bnTokens.forEach(bn => tokens.push(bn.toNumber()));

      assert.deepEqual(tokens.length, tokenAmount);
    });

    it("should fail with incorrect signature", async function () {
      await contract.togglePresale();
      const price = await contract.price(1);

      // Fake Signature
      const signature = web3.utils.utf8ToHex('fakesignature');
      await truffleAssert.reverts(contract.mint(tokenAmount, timestamp, signature, { 'from': minterAddress, 'value': price }));
    });

    it("should fail with previous timestamp", async function () {
      await contract.togglePresale();
      const price = await contract.price(1);
      
      // Data Pack
      const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [minterAddress, tokenAmount, timestamp - 31]
      );
      
      // Signature Generate
      const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
      const messageBytes = web3.utils.hexToBytes(messageHex);
      const messageBuffer = Buffer.from(messageBytes);
      const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
      const signature = Account.sign(hash, process.env.PRIVATE_KEY);

      await truffleAssert.reverts(contract.mint(tokenAmount, timestamp - 31, signature, { 'from': minterAddress, 'value': price }));
    })
  });

  describe('withdraw function check', function(){
   
  });

  describe('giftMint admin func check', function() {
    const royalAddresses = ['0xD8c844d326316358BD156b88D61F7C7dECF3446b', '0x348EA0F28b3FfA185b00415d78FFe7FC2BFFa794'];
    const tokenAmounts = [5, 4];

    it("should fail with non-owner account", async function () {
      await truffleAssert.reverts(contract.giftMint(royalAddresses, tokenAmounts, {'from': accounts[1]}));
    });

    it("should mint gift tokens correctly", async function () {
      await contract.giftMint(royalAddresses, tokenAmounts, {'from': accounts[0]});
      for(let i = 0; i < royalAddresses.length; i ++){
        let balance = await contract.balanceOf(royalAddresses[i]);
        assert.equal(balance, tokenAmounts[i]);
      }
    });
  })
});
