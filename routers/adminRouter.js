const AdminController = require('../Controllers/AdminController')
const User = require('../models/User')
const Response = require('../models/Response')
const DbDefine = require('../utils/DbDefine')


/**
 * @design by milon27
 */
const router = require('express').Router()

/**
 * @description 0. get all client paginate (admin)
 * @endpoint http://localhost:2727/admin/all-client/:page
 * @example http://localhost:2727/admin/all-client/1
 */
router.get('/all-client/:page', async (req, res) => {
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
 * @description 0. Delete user(client)
 * @endpoint http://localhost:2727/admin/delete/user/:uid
 * @example http://localhost:2727/admin/delete/user/1
 */
router.delete('/delete/user/:uid', AdminController.deleteUser)



module.exports = router