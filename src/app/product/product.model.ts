/**
 * Module dependencies
 */

 const {Schema, model} = require("mongoose");
 
 const ProductSchema = new Schema({
     productTitle: {
         type: String,
         required: true
     },

     quantityAvailable: {
         type: String,
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
    }
     

     
 },

 {tumestamps:true}
 )

 model("Product", ProductSchema);
 module.exports = model("Product");