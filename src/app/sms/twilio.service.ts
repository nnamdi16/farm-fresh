import { IUser } from "user/user.interface";

require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from 'twilio';
import * as TwilioClient from 'twilio/lib/rest/Twilio';
const client: TwilioClient = twilio(accountSid, authToken);

// const twilio = require('twilio')(accountSid,authToken);

console.log(accountSid,authToken);
exports.sendSMS = (phone:string,message:any) => {
   
    client.messages.create(
        {
            body: message,
            from:process.env.TWILIO_PHONE_NUMBER,
            to: phone
        }
    )
    .then(message => console.log(message.sid))
}

// exports.verifications = (phoneNumber:String, via:String) => {
//     return client.verify.services()
// }