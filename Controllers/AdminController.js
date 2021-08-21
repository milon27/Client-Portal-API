const File = require("../models/File")
const Page = require("../models/Page")
const Response = require("../models/Response")
const User = require("../models/User")
const Define = require("../utils/Define")

const fs = require('fs')

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

    //delete & update page
    deletePage: async (req, res) => {
        try {
            const id = req.params.pid
            const result = await Page.destroy({
                where: {
                    id: id
                }
            })

            if (result === 0) {
                res.send(Response(true, "deletion failed.", false))
            } else {
                res.send(Response(false, "delete success", true))
            }
        } catch (error) {
            res.send(Response(true, error.message, false))
        }
    },
    //update a page data
    updatePage: async (req, res) => {
        try {
            const data = req.body
            if (!data.id) {
                throw new Error("ID not defined for new object.")
            }
            const [result, obj] = await Page.update(data, {
                where: {
                    id: data.id
                }
            })

            if (result === 0) {
                res.send(Response(true, "update failed.", false))
            } else {
                res.send(Response(false, "update success", data))
            }
        } catch (error) {
            res.send(Response(true, error.message, false))
        }
    },

    //delete & update file
    deleteFile: async (req, res) => {
        try {
            const id = req.params.fid

            const result = await File.destroy({
                where: {
                    id
                }
            })

            if (result === 0) {
                res.send(Response(true, "deletion failed.", false))
            } else {
                if (req.body.old_url) {
                    const path = req.body.old_url.split("/").pop()
                    fs.unlinkSync(Define.UPLOAD_DESTINATION + path)
                    res.send(Response(false, "delete success", true))
                } else {
                    res.send(Response(false, "delete success", true))
                }
            }
        } catch (error) {
            res.send(Response(true, error.message, false))
        }
    },


    updateFile: async (req, res) => {
        try {
            let newobj = {}
            //get data from body
            const file = req.file
            const data = req.body
            if (file) {
                const url = Define.STATIC_URL + file.filename
                newobj.url = url
                //new file there so delete old url:

                const oldurl = data.old_url

                const path = oldurl.split("/").pop()
                //console.log("---------", path);
                fs.unlinkSync(Define.UPLOAD_DESTINATION + path)
                console.log("old file deleted");
            }


            if (!data.id) {
                throw new Error("Enter File Id")
            }
            //if we have old url,remove old url
            if (data.old_url) {
                delete data.old_url
            }
            newobj = {
                ...newobj,
                ...data
            }

            const [result, obj] = await File.update(newobj, {
                where: {
                    id: newobj.id
                }
            })

            if (result === 0) {
                res.send(Response(true, "update failed.", false))
            } else {
                res.send(Response(false, "update success", newobj))
            }
        } catch (error) {
            res.send(Response(true, error.message, false))
        }
    },
}
module.exports = AdminController