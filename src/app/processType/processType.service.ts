import { IProcessType } from "./processType.interface";

const ProcessTypeSchema = require('./processType.model');


exports.createProcessType = async function (data:IProcessType) {
    try {
        const {processTypeId, description} = data;
        const createProcessTypeObject= new ProcessTypeSchema(
            {
                processTypeId,
                description
            }
        );
        const checkExistingProcessType = await ProcessTypeSchema.exists({
            processTypeId
        });
        if (checkExistingProcessType) {
           return {
               error: true,
               message: `ProcessType already exist`
           }; 
        }
        await createProcessTypeObject.save();
        return {
            error: false,
            message: `${processTypeId} successfully created`
        }
    } catch (error) {
        
    }
}