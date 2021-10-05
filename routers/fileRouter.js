const FileController = require('../Controllers/FileController')
const File = require('../models/File')
const Response = require('../models/Response')
const Helper = require('../utils/Helper')
const Uploader = require('../utils/MulterUtil')

/**
 * @design by milon27
 */
const router = require('express').Router()


/**
 * 1. create a file.
 * 2. get all files for a page. without relation
 */

/**
 * @description 1. create a file.
 * @endpoint http://localhost:2727/file/create-file
 * @example same
 */

/**
 * Axios setup
 * 
    const ob = new FormData()
    ob.append('img', img.files[0], img.files[0].name)
    ob.append('pid', 1)
    ob.append('title', "File One")
    ob.append('description', "File Desc")

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
        const { pid, title, description } = req.body
        if (!Helper.validateField(pid, title, description)) {
            throw new Error("Enter Page id,File title,description")
        }
        const url = Helper.getBaseUrl(req) + file.filename

        //create a page
        const fileOb = await File.create({ pid, title, description, url })

        res.send(Response(false, "success", fileOb.toJSON()))
    } catch (error) {
        res.send(Response(true, error.message, false))
    }
})

/**
 * @description 2. get all files with page for a page.
 * @endpoint http://localhost:2727/file/only-files/:pid
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



/**
 * @description 3. Delete File
 * @endpoint http://localhost:2727/file/delete/file/:fid
 * @example http://localhost:2727/file/delete/file/1
 */
router.delete('/delete/file/:fid', FileController.deleteFile)

/**
 * @description 4. update File
 * @endpoint http://localhost:2727/file/update/file
 * @example http://localhost:2727/file/update/file
 */
router.put('/update/file', Uploader.single("img"), FileController.updateFile)

module.exports = router