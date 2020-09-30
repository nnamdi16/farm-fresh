import { Schema} from "mongoose";
import { IProcess } from "./process.interface";

const ProcessSchema = require('./process.model');

exports.createProcess = async function (data:IProcess) {
    try {
        const {processTypeId, createdBy, updatedBy, processCode, processStatus, token } = data;
        const createProcessObject= new ProcessSchema(
            {
                processTypeId,
                createdBy,
                updatedBy,
                processCode,
                processStatus,
                token
            }
        );
        await createProcessObject.save();
        return {
            error: false,
            message: `Process successfully created`
        }
    } catch (error) {
        
    }
}