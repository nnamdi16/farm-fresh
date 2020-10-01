import {Schema} from "mongoose";

/**
 * Module Dependencies
 */

const UserProfileSchema: Schema = new Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})