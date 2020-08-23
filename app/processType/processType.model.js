const {Schema, model} = require("mongoose");

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