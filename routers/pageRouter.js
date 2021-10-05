"use strict";

const User = require('../models/User')
const Page = require('../models/Page')
const Response = require('../models/Response')
const DbDefine = require('../utils/DbDefine')
const Helper = require('../utils/Helper')

const PageController = require('../Controllers/PageController')

/**
 * @design by milon27
 */
const router = require('express').Router()


/**
 * @description 1. create a page by admin.
 * @endpoint http://localhost:2727/page/create-page/
 * @example same
 */
router.post('/create-page', async (req, res) => {
    try {
        //get data from body
        let { uid, title, title_sidebar, icon, data_one, data_two, data_three } = req.body
        if (!Helper.validateField(uid, title, title_sidebar, icon)) {
            throw new Error("Enter Client ID,Page Title,title_sidebar, icon")
        }
        data_one = data_one || DbDefine.NOT_SET_STR
        data_two = data_two || DbDefine.NOT_SET_STR
        data_three = data_three || DbDefine.NOT_SET_STR
        //create a page
        const page = await Page.create({ uid: uid, icon, title, title_sidebar, data_one: data_one, data_two: data_two, data_three: data_three })

        res.send(Response(false, "success", page.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})


/**
 * @description 2. get all pages for a client.(who logged in)
 * @description 2. get all pages for a client.(as admin by query param cid=client id)
 * @endpoint http://localhost:2727/page/get-pages
 * @endpoint http://localhost:2727/page/get-pages?cid=1
 * @example same
 */
router.get('/get-pages', PageController.getPageList)


//not used
/**
 * @description 3. get single page details for a client.
 * @endpoint http://localhost:2727/page/get-page/:pid
 * @example same
 */
router.get('/get-page/:pid', async (req, res) => {
    try {
        const id = req.params.pid

        const page = await Page.findOne({
            where: { id }
        })
        res.send(Response(false, "success", page))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

// update and delete
/**
 * @description 4. Delete Page
 * @endpoint http://localhost:2727/page/delete/page/:pid
 * @example http://localhost:2727/page/delete/page/1
 */
router.delete('/delete/page/:pid', PageController.deletePage)


/**
 * @description 5. update Page
 * @endpoint http://localhost:2727/page/update/page
 * @example http://localhost:2727/page/update/page
 */
router.put('/update/page', PageController.updatePage)



///===============File=================
/**
 * @description 6. get single page with all files related to it.
 * @endpoint http://localhost:2727/page/get-files/:pid
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