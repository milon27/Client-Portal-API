const File = require("../models/File")
const Response = require("../models/Response")
const Define = require("../utils/Define")

const fs = require('fs')
const Helper = require("../utils/Helper")

const FileController = {
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
                const url = Helper.getBaseUrl(req) + file.filename
                newobj.url = url
                //new file there so delete old url:

                const oldurl = data.old_url

                const path = oldurl.split("/").pop()
                //console.log("---------", path);
                fs.unlinkSync(Define.UPLOAD_DESTINATION + path)
                console.log("---------old file deleted");
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

            console.log("newobj---", newobj);

            const [result, obj] = await File.update(newobj, {
                where: {
                    id: newobj.id
                }
            })

            if (result === 0) {
                res.send(Response(true, "update failed.", false))
            } else {
                res.send(Response(false, "update success", { ...newobj, id: parseInt(newobj.id) }))
            }
        } catch (error) {
            res.send(Response(true, error.message, false))
        }
    },
}
module.exports = FileController