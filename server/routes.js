const router = require('express').Router();
const {
    body
} = require('express-validator');

const { checkIfAirdropActive, checkIfClaimable, getClaimData, updateClaimData } = require('./controllers/airdropController')
const { getMintData, setHistory } = require('./controllers/mintController')

router.get('/api/checkIfAirdropActive', checkIfAirdropActive)
router.post('/api/checkIfClaimable', [body('address')], checkIfClaimable)
router.post('/api/getClaimData', [body('address', 'count')], getClaimData)
router.post('/api/updateClaimData', [body('sol_address', 'count')], updateClaimData);
router.post('/api/getMintData', [body('address', 'count')], getMintData);
// router.post('/setHistory', [body('address', 'historyId')], setHistory);

module.exports = router;