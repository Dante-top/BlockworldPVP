const db = require("../models");
const ClaimListDB = db.claimlist;
const dotenv = require('dotenv');
dotenv.config();
var Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider(process.env.RINKEBY_WEB3_PROVIDER));
const BlockHeads = require("../abi/BlockHeads.json");
const contract = new web3.eth.Contract(BlockHeads.abi, process.env.CONTRACT_ADDRESS);
const sequelize = require('sequelize');
const Op = sequelize.Op;
const Account = require('eth-lib/lib/account');
const ethereumjsUtil = require('ethereumjs-util');


/**
 * checkIfAirdropActive
 * Returns isAirdropLive: boolean
 */

exports.checkIfAirdropActive = async (req, res, next) => {
    const isAirdropActive = await contract.methods.isAirdropStarted().call();
    res.json({
        success: true,
        data: {
            isAirdropActive
        }
    });
}


/**
 * checkIfClaimable
 * Param - Phantom Address
 * Returns isClaimable : boolean
 *         claimableNum: integer
 */

exports.checkIfClaimable = async (req, res, next) => {
    console.log(req.body);
    if (!req.body.address) {
        res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
        return;
    }

    const isAirdropActive = await contract.methods.isAirdropStarted().call();

    if (isAirdropActive) {
        const user = await ClaimListDB.findOne({ where: { sol_address: req.body.address } });
        if (user) {
            max_mint = parseInt(user.max_mint);
            if (max_mint > 0) {
                res.json({
                    success: true,
                    data: {
                        max_mint
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: "Sorry, You have already claimed all."
                });
            }
        } else {
            res.json({
                success: false,
                message: "Sorry, You are not Solana NFT Holder."
            });
        }
    } else {
        res.json({
            success: false,
            message: "Sorry, Airdrop is not active."
        });
    }

}

/**
 * getClaimData
 * Param - Ethereum Address : string
 *       - Number of tokens to mint : integer
 * Returns 
 *       - Signature
 */

exports.getClaimData = async (req, res, next) => {
    console.log(res.body);
    if (!req.body.address || !req.body.count) {
        res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
        return;
    }

    const checkstamp = parseInt(new Date().getTime() / 1000);
    const price = await contract.methods.PRICE().call();
    const timestamp = parseInt(new Date().getTime() / 1000);

    // Data Pack
    const data = web3.eth.abi.encodeParameters(
        ['address', 'uint256', 'uint256'],
        [req.body.address, parseInt(req.body.count), timestamp]
    );

    // Signature Generate
    const messageHex = web3.utils.isHexStrict(data) ? data : web3.utils.utf8ToHex(data);
    const messageBytes = web3.utils.hexToBytes(messageHex);
    const messageBuffer = Buffer.from(messageBytes);
    const hash = ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(messageBuffer));
    const signature = Account.sign(hash, process.env.PRIVATE_KEY);
    res.json({
        success: true,
        tokenAmount: parseInt(req.body.count),
        timestamp: timestamp,
        signature: signature,
        price: price,
    })
}

/**
 * setHistory
 * Function to update mint record success
 * Table: MintHistory
 */
exports.updateClaimData = async (req, res, next) => {
    if (!req.body.sol_address || !req.body.count) {
        res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
        return;
    }

    const user = await ClaimListDB.findOne({ where: { sol_address: req.body.sol_address } });
    const mint_count = parseInt(user.max_mint) - parseInt(req.body.count);

    if (user) {
        user.update({ max_mint: mint_count });
        res.json({
            success: true,
            max_mint: mint_count
        });
    } else
        res.json({ success: false });
}