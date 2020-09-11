require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid,authToken);

console.log(accountSid,authToken);
exports.sendSMS = (phone:String,message:String) => {
   
    twilio.messages.create(
        {
            body: message,
            from:process.env.TWILIO_PHONE_NUMBER,
            to: phone
        }
    )
    .then(message => console.log(message.sid))
}

exports.verifications = (phoneNumber:String, via:String) => {
    return twilio.verify.services()
}