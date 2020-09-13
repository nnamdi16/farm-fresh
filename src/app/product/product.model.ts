/**
 * Module dependencies
 */

import  {Schema, model} from "mongoose";
import { IProduct } from "./product.interface";
 
 const ProductSchema = new Schema({
     productTitle: {
         type: String,
         required: true
     },

     quantityAvailable: {
         type: Number,
         required:true
     },

     photoUpload: {
         type: String,
         required:true
     },

     description: {
         type:String,
         required:true
     },

     price: {
         type:Number,
         required:true
     },

     quantityPerPrice: {
        type: Number,
        required: true
     },

     location: {
       city:{type: String, required:true},
       country: {type: String, required:true},
       address:{type: String, required:true},
     },

     currency: {
         type: String,
         default:null
     },

     productType: {
         type:String,
         default:null
     },

     sizes: {
         type: [String],
         required:true
        }, 

     additionalProperty: {
        type:String,
        default:null
     },

    minimumOrderQuantity: {
        type:String,
        default:null
    },

    sellerId: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt: {
        type:Date,
        required:false
    },
    modifiedAt: {
        type:Date,
        required:false
    }
     
   }
 ).pre<IProduct>('save', function (next:any) {
    this.isNew ? (this.createdAt = new Date()) :(this.modifiedAt=new Date());
 })

 export default model<IProduct>("Product", ProductSchema);
//  module.exports = model("Product");