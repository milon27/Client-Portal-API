/**
 * @design by milon27
 */
const Response = require('../../models/Response');
const Define = require('../../utils/Define');
const Helper = require('../../utils/Helper');
const AuthMid = (req, res, next) => {

    try {
        const token = req.cookies[Define.TOKEN]
        if (!token) {
            throw new Error("Unauthorized Access")
        }
        //token validation
        const { id } = Helper.verifyJWTtoken(token)

        //set user id in request
        req.id = id
        next()
    } catch (e) {
        res.status(401).json(Response(true, e.message, e))
    }

}

module.exports = AuthMid;