import {Schema, model} from "mongoose";
import {IProcessType} from "./processType.interface";

const ProcessTypeSchema: Schema = new Schema(
    {
        processTypeId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)

export default model<IProcessType>("ProcessType", ProcessTypeSchema);
// module.exports = model("ProcessType");