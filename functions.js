const axios = require('axios');
const sms_api = require('./app/config/sms-api-url-config')
/**
 * Send an SMS
 * @param recipient Phone number 26771234567
 * @param message Text to send
 * @return messageIndex or error code with message
 */
const sendSMS = async (recipient, message) => {
    // encode parameters for uri string
    recipient = encodeURIComponent(recipient);
    message = encodeURIComponent(message);

    // create url from encoded parameters
    const url = `${sms_api.url}?Handler=${sms_api.handler}&Username=${sms_api.username}&Password=${sms_api.password}&To=${recipient}&From=Bayport&Message=${message}&Options=0`;

    // hit the url
    const response = await axios.get(url);

    // return message Index
    return response.data;
}

module.exports = {sendSMS};