const User = require('../models/User')
const Page = require('../models/Page')
const File = require('../models/File')
const Response = require('../models/Response')

const DbDefine = require('../utils/DbDefine')
const Helper = require('../utils/Helper')

/**
 * @design by milon27
 */
const router = require('express').Router()

/**
 * @description 1. create a page.
 * @endpoint http://localhost:2727/client/create-page/
 * @example same
 */
router.post('/create-page', async (req, res) => {
    try {
        //get data from body
        const { cid, title, data1, data2, data3 } = req.body
        if (!Helper.validateField(cid, title)) {
            throw new Error("Enter Client ID,Page Title")
        }
        //create a page
        const page = await Page.create({ uid: cid, title, data_one: data1, data_two: data2, data_three: data3 })

        res.send(Response(false, "success", page.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})


/**
 * @description 2. get all pages for a client.
 * @endpoint http://localhost:2727/client/get-pages/:cid
 * @example same
 */
router.get('/get-pages/:cid', async (req, res) => {
    try {
        const id = req.params.cid

        const pages = await User.findOne({
            where: { id: id },
            include: [DbDefine.PAGE_TABLE],
        })
        res.send(Response(false, "success", pages.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

///===============File=================
/**
 * @description 3. create a file.
 * @endpoint http://localhost:2727/client/create-file
 * @example same
 */
router.post('/create-file', async (req, res) => {
    try {

        //get data from body
        const { pid, title, url } = req.body
        if (!Helper.validateField(pid, title, url)) {
            throw new Error("Enter Page id,File title,File url")
        }
        //create a page
        const file = await File.create({ pid, title, url })

        res.send(Response(false, "success", file.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

/**
 * @description 4. get all files for a page.
 * @endpoint http://localhost:2727/client/get-files/:pid
 * @example same
 */
router.get('/get-files/:pid', async (req, res) => {
    try {
        const pid = req.params.pid

        const pageWithFiles = await Page.findOne({
            where: { id: pid },
            include: [DbDefine.FILE_TABLE],
        })
        res.send(Response(false, "success", pageWithFiles.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

module.exports = router