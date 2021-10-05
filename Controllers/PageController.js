const Page = require("../models/Page")
const Response = require("../models/Response")

const PageController = {
    //if cid query param is there then use it.other wise logged in user
    getPageList: async (req, res) => {
        try {
            let id = req.id
            if (req.query.cid) {
                id = req.query.cid
            }
            const pages = await Page.findAll({
                where: { uid: parseInt(id) }
            })

            res.send(Response(false, "success", pages))
        } catch (error) {
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
}

module.exports = PageController