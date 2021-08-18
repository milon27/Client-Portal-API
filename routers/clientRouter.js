const User = require('../models/User')
const Page = require('../models/Page')
const File = require('../models/File')
const Response = require('../models/Response')

const DbDefine = require('../utils/DbDefine')
const Helper = require('../utils/Helper')

const Uploader = require('../utils/MulterUtil')
const ClientController = require('../Controllers/ClientController')

/**
 * @design by milon27
 */
const router = require('express').Router()


/**
 * @description 0. get all client paginate (admin)
 * @endpoint http://localhost:2727/client/all/:page
 * @example http://localhost:2727/client/all/1
 */
router.get('/all/:page', async (req, res) => {
    try {
        let page = req.params.page
        page = page - 1

        const users = await User.findAll({
            where: {
                is_admin: false
            },
            limit: DbDefine.TOTAL_PAGE_SIZE,
            offset: page * DbDefine.TOTAL_PAGE_SIZE
        })
        res.send(Response(false, "success", users))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})


/**
 * @description 1. create a page by admin.
 * @endpoint http://localhost:2727/client/create-page/
 * @example same
 */
router.post('/create-page', async (req, res) => {
    try {
        //get data from body
        let { uid, title, data_one, data_two, data_three } = req.body
        if (!Helper.validateField(uid, title)) {
            throw new Error("Enter Client ID,Page Title")
        }
        data_one = data_one || DbDefine.NOT_SET_STR
        data_two = data_two || DbDefine.NOT_SET_STR
        data_three = data_three || DbDefine.NOT_SET_STR
        //create a page
        const page = await Page.create({ uid: uid, title, data_one: data_one, data_two: data_two, data_three: data_three })

        res.send(Response(false, "success", page.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})


/**
 * @description 2. get all pages for a client.(who logged in)
 * @endpoint http://localhost:2727/client/get-pages
 * @endpoint http://localhost:2727/client/get-pages?cid=1
 * @example same
 */
router.get('/get-pages', ClientController.getPageList)


//not used
/**
 * @description 2. get single page details for a client.
 * @endpoint http://localhost:2727/client/get-page/:pid
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

///===============File=================
/**
 * @description 3. create a file.
 * @endpoint http://localhost:2727/client/create-file
 * @example same
 */

/**
 * Axios setup
 * 
    const ob = new FormData()
    ob.append('img', img.files[0], img.files[0].name)
    ob.append('pid', 1)
    ob.append('title', "File One")

    axios.defaults.baseURL = 'http://localhost:2727/';

    axios.post('create-file', ob).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })
 */
router.post('/create-file', Uploader.single('img'), async (req, res) => {
    try {

        //get data from body
        const file = req.file
        const { pid, title } = req.body
        if (!Helper.validateField(pid, title)) {
            throw new Error("Enter Page id,File title")
        }
        const url = "http://localhost:2727/static/" + file.filename

        //create a page
        const fileOb = await File.create({ pid, title, url })

        res.send(Response(false, "success", fileOb.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

/**
 * @description 4. get all files with page for a page.
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


/**
 * @description 4. get all files with page for a page.
 * @endpoint http://localhost:2727/client/only-files/:pid
 * @example same
 */
router.get('/only-files/:pid', async (req, res) => {
    try {
        const pid = req.params.pid

        const files = await File.findAll({
            where: { pid: pid }
        })
        res.send(Response(false, "success", files))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

module.exports = router