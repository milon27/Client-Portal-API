const Page = require("../models/Page")
const Response = require("../models/Response")

const ClientController = {
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
    }
}

module.exports = ClientController