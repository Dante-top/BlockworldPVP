const db = require("../models");
const WhiteListDB = db.whitelist;
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
 * getClaimData
 * Param - Ethereum Address : string
 *       - Number of tokens to mint : integer
 * Returns 
 *       - Signature
 */

exports.getMintData = async (req, res, next) => {
    if (!req.body.address || !req.body.count) {
        res.status(400).send({
            success: false,
            message: "Content can not be empty!",
        });
        return;
    }

    const checkstamp = parseInt(new Date().getTime() / 1000);

    const isPresaleLive = await contract.methods.isPresaleStarted().call();
    const isPublicSaleLive = await contract.methods.isPublicsaleStarted().call();
    console.log('isPresaleLive: ', isPresaleLive)
    if (!isPresaleLive && !isPublicSaleLive) {
        res.json({
            success: false,
            message: "Sorry, Sale has not started yet.",
        });
        return;
    }
    if (isPresaleLive) {
        const user = await WhiteListDB.findOne({ where: { address: req.body.address } });
        if (!user) {
            // user is not whitelisted  
            res.json({
                success: false,
                message: "Sorry, You are not whitelisted!",
            });
            return;
        }
    }

    // If user is whitelisted or Public Sale
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
    console.log('price: ', price);
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
// exports.setHistory = async (req, res, next) => {
//     if (!req.body.address || !req.body.historyId) {
//         res.status(400).send({
//             success: false,
//             message: "Content can not be empty!",
//         });
//         return;
//     }

//     const history = await MintHistory.findOne({ where: { id: req.body.historyId } });

//     if (history && history.address == req.body.address) {
//         history.update({ success: 1 });
//         res.json({ success: true });
//     } else
//         res.json({ success: false });
// }
