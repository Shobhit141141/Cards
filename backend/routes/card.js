const express = require('express')
const {
    createcard,
    getcard,
    getoncard,
    deletecard,
    updatecard
} = require('../controllers/cardcontroller')



const router = express.Router()


router.get('/', getcard)


router.get('/:id', getoncard)


router.post('/', createcard)


router.delete('/:id', deletecard)


router.patch('/:id', updatecard)


module.exports = router