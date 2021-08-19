const User = require('../models/User')
const Page = require('../models/Page')
const File = require('../models/File')
const Response = require('../models/Response')

const DbDefine = require('../utils/DbDefine')
const Helper = require('../utils/Helper')

const Uploader = require('../utils/MulterUtil')
const AdminController = require('../Controllers/AdminController')

/**
 * @design by milon27
 */
const router = require('express').Router()


/**
 * @description 0. Delete user
 * @endpoint http://localhost:2727/admin/delete/user/:uid
 * @example http://localhost:2727/admin/delete/user/1
 */
router.delete('/delete/user/:uid', AdminController.deleteUser)

/**
 * @description 1. Delete Page
 * @endpoint http://localhost:2727/admin/delete/page/:pid
 * @example http://localhost:2727/admin/delete/page/1
 */
router.delete('/delete/page/:pid', AdminController.deletePage)


/**
 * @description 2. update Page
 * @endpoint http://localhost:2727/admin/update/page
 * @example http://localhost:2727/admin/update/page
 */
router.put('/update/page', AdminController.updatePage)

/**
 * @description 3. Delete File
 * @endpoint http://localhost:2727/admin/delete/file/:fid
 * @example http://localhost:2727/admin/delete/file/1
 */
router.delete('/delete/file/:fid', AdminController.deleteFile)

/**
 * @description 4. update File
 * @endpoint http://localhost:2727/admin/update/file
 * @example http://localhost:2727/admin/update/file
 */
router.put('/update/file', Uploader.single("img"), AdminController.updateFile)

module.exports = router