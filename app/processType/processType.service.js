const ProcessTypeSchema = require('./process.model');


exports.createProcessType = async function (data) {
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