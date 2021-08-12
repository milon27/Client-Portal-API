const User = require('../models/User')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const data = await User.findAll()
    res.json(data)
})


router.get('/add', async (req, res) => {
    const data = await User.create({
        name: "karim",
        password: "test",
        gender: "male"
    })
    res.json(data)
})


module.exports = router