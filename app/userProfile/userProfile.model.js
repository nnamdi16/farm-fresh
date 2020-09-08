/**
 * Module Dependencies
 */
const {Schema, model} = require("mongoose");

const UserProfileSchema = new Schema({
    address: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    }
})