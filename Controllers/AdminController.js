const File = require("../models/File")

const Response = require("../models/Response")
const User = require("../models/User")
const Define = require("../utils/Define")

const fs = require('fs')
const Helper = require("../utils/Helper")

const AdminController = {
    //delete a user who is client (not admin)
    deleteUser: async (req, res) => {
        try {
            const uid = req.params.uid
            const result = await User.destroy({
                where: {
                    id: uid,
                    is_admin: false
                }
            })

            if (result === 0) {
                res.send(Response(true, "deletion failed.", false))
            } else {
                res.send(Response(false, "delete success", true))
            }
        } catch (error) {
            console.log(error);
            res.send(Response(true, error.message, false))
        }
    },
}
module.exports = AdminController