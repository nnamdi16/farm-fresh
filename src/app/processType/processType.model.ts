import {Schema, model } from "mongoose";

const ProcessTypeSchema = new Schema(
    {
        processTypeId: {
            type:String,
            required: true
        },
        description:{
            type:String,
            required: true
        }
    }
)

model("ProcessType",ProcessTypeSchema);
module.exports = model("ProcessType");