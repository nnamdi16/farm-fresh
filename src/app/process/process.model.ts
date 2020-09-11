/**
 * Module dependencies
 */

 import {Schema, model} from 'mongoose';

 const processStatus = Object.freeze(
     {
         Pending:'PENDING',
         Expired:'EXPIRED',
         Success:'SUCCESS'
     }
 )
 
 const ProcessSchema = new Schema(
     {
         processTypeId: {
             type:Schema.Types.ObjectId,
             ref:"ProcessType"
         },
         createdBy: {
             type:Schema.Types.ObjectId,
             ref:"User"
         },
         updatedBy: {
             type:Schema.Types.ObjectId,
             ref:"User"
         },
         processCode: {
             type:String
         },
         processStatus: {
             type:String,
             enum:Object.values(processStatus),
             default:processStatus.Pending
         },
         token: {
             type: String
         }
     },

     {timestamps:true}
 )

 Object.assign(ProcessSchema.statics, {processStatus});

 model("Process", ProcessSchema);

 module.exports = model("Process");