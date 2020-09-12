/**
 * Module dependencies
 */

 import {Schema, model} from 'mongoose';
 import {IProcess}  from './process.interface';


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
             ref:"ProcessType",
             required:true
         },
         createdBy: {
             type:Schema.Types.ObjectId,
             ref:"User",
             required:true
         },
         updatedBy: {
             type:Schema.Types.ObjectId,
             ref:"User",
             required:true
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
         },
         createdAt: {
            type:Date,
            required:false
        },
    
        modifiedAt: {
            type:Date,
            required:false
        }
     },

    //  {timestamps:true}
 ).pre<IProcess>('save',function (next:any) {
     this.isNew ? (this.createdAt = new Date()) :(this.modifiedAt=new Date());
 })

 Object.assign(ProcessSchema.statics, {processStatus});

 export default model<IProcess>("Process", ProcessSchema);

//  module.exports = model("Process");