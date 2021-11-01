const axios = require('axios');

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
    const url = `http://83.143.26.34/MMWebService/MessageMaster.aspx?Handler=
    SendTextMessage&Username=Bayport&Password=bay123&To=${recipient}
    &From=Bayport&Message=${message}&Options=0`;

    // hit the url
    const response = await axios.get(url);

    // return message Index
    return response.data;
}

module.exports = {sendSMS} ;