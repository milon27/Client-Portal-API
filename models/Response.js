/**
 * response
 * @param {Boolean} error 
 * @param {String} message 
 * @param {Object} data 
 * @returns {Response}
 */
const Response = (error, message, data) => {
    return {
        error,
        message,
        response: data
    }
}
module.exports = Response