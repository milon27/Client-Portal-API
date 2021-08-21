/**
 * response
 * @param {Boolean} error 
 * @param {String} message 
 * @param {Object} data 
 * @returns {Response}
 */
const Response = (error, message, response) => {
    return {
        error,
        message,
        response
    }
}
module.exports = Response