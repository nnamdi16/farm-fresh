/**
 * Module dependencies
 */

import {Schema, model} from "mongoose";
import {IUser} from './user.interface';
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
    middleName: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function (type:any) {
                return type.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/)|| null;
            },
            msg:`Phone number doesn't match any India phone number format`
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
    },

    createdAt: {
        type:Date,
        required:false
    },

    modifiedAt: {
        type:Date,
        required:false
    }

},  
 
).pre<IUser>('save', function (next:any) {
    this.isNew ? (this.createdAt = new Date()): (this.modifiedAt = new Date());
    next();
})


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

 export default model<IUser>('User',UserSchema);


//  module.exports = model("User");