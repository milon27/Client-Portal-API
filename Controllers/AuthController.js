const bcryptjs = require('bcryptjs')
const Response = require('../models/Response')
const User = require('../models/User')
const Define = require('../utils/Define')
const Helper = require('../utils/Helper')

const AuthController = {
    /**
     * @description
     * get email, name, password from req.body
     * do validatioin
     * ck already have an account or not(mySql Optional,Mongo required)
     * create password hash,save into database
     * generate a jwt access token,set into http cookie
     * return new user object as response
    * @param { email, name, password} =req.body
     * @response {error(boolean), message(String), response(object:USER)}
     */
    signUp: async (req, res) => {
        try {
            const { email, name, password } = req.body
            //validatioin handle by sequlize
            if (password.length < 6) {
                throw new Error("Password Length Should be More than 5 character.")
            }
            //get hash pass & save new user into db
            const hashpass = await bcryptjs.hash(password, await bcryptjs.genSalt(10))
            const user = {
                email,
                name,
                password: hashpass
            }
            //save on database
            const { dataValues } = await User.create(user)
            //get token and set into cookie
            const token = Helper.getJWTtoken(email)
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION)
            delete dataValues.password
            res.status(200).json(Response(false, "user created successfully", { ...dataValues, token }))

        } catch (e) {
            console.log("auth sign up: ", e);
            let response = Response(true, e.message, e);
            res.json(response);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            //validatioin
            if (!email || !password) {
                throw new Error("Enter email,password")
            }
            //check user is available or not in db
            const user = await User.findOne({
                where: {
                    email
                }
            })
            //validate password
            const ckPass = await bcryptjs.compare(password, user.password)
            if (!ckPass) {
                throw new Error("Wrong email or password")
            }

            //get token and set into cookie
            const token = Helper.getJWTtoken(email)
            //send token in http cookie with no expire
            res.cookie(Define.TOKEN, token, Define.SESSION_COOKIE_OPTION)
            delete user.password
            res.status(200).json(Response(false, "User Login successfully", { ...user, token }))

        } catch (e) {
            console.log("auth login: ", e);
            let response = Response(true, e.message, e);
            res.json(response);
        }
    },
    logout: (req, res) => {
        res.cookie(Define.TOKEN, "", Define.LOGOUT_COOKIE_OPTION)
        res.status(200).json(Response(false, "user logged out", true))
    },
    isLoggedIn: (req, res) => {
        try {
            const token = req.cookies[Define.TOKEN]
            if (!token) {
                throw new Error("Unauthorized Access")
            }
            //token validation
            Helper.verifyJWTtoken(token)
            res.send(true)// logged in
        } catch (e) {
            //remove the old/expire token
            res.cookie("token", "", Define.LOGOUT_COOKIE_OPTION)
            res.send(false)//not logged in
        }
    }
}
module.exports = AuthController