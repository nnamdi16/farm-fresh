/**
 * Module dependencies
 */

const {Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
 
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
        required: true
    },
    role:{
        type: String
    },
    password: {
        type: String,
        required: true
    }

})

/**
 * Add pre-save hook
 */

 UserSchema.methods.setPassword = function (password) {
     console.log(password);
     this.password = bcrypt.hashSync(password,saltRounds);
     
 }

 UserSchema.methods.generateAuthToken = async function (password,hashedPassword) {
     const match = await bcrypt.compare(password,hashedPassword);
     return match;
 }

 model("User",UserSchema);

 module.exports = model("User");