const Define = {
    //user access token
    TOKEN: "auth_token",
    SESSION_COOKIE_OPTION: {
        httpOnly: true,
        secure: false,//only for browser
        sameSite: 'lax',
        //maxAge: 1 * 24 * 60 * 60 * 1000//1 day in milis
    },
    LOGOUT_COOKIE_OPTION: {
        httpOnly: true,
        secure: false,//only for browser
        sameSite: 'lax',
        expires: new Date(0)
    },
    //pagination
    PAGINATE_PAGE_SIZE: 10,
    //moment js time constant
    DAYS: "days",
    MONTHS: "months",
    MINUTES: "minutes",
    SECONDS: "seconds",

}
module.exports = Define