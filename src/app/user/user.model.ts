/**
 * Module dependencies
 */

import {Schema, model, Document,Types,Query} from "mongoose";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registrationStatus = Object.freeze(
    {
        Verified: 'VERIFIED',
        Unverified: 'UNVERIFIED'
    }
);
 
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (type:String) : RegExpMatchArray | null{
                return type.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/);
            },
            message:`Phone number doesn't match any India phone number format`
        }
        
    },
    role:{
        type: String
    },
    password: {
        type: String,
        required: true
    },
    registrationStatus: {
        type:String,
        enum:Object.values(registrationStatus),
        default:registrationStatus.Unverified
    }

},  
 
{timestamps:true} )


Object.assign(UserSchema.statics, {registrationStatus});
/**
 * Add pre-save hook
 */

 UserSchema.methods.setPassword = function (password:String) {
     console.log(password);
     this.password = bcrypt.hashSync(password,saltRounds);
     
 }

 UserSchema.methods.generateAuthToken = async function (password:String,hashedPassword:String) {
     const match = await bcrypt.compare(password,hashedPassword);
     return match;
 }

 UserSchema.methods.comparePassword= function (password:String,hashedPassword:String) {
     const match = bcrypt.compareSync(password,hashedPassword)
     return match;
 }

 model("User",UserSchema);

 module.exports = model("User");