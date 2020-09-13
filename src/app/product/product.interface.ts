import {Document, Types} from 'mongoose';
import { IUser } from 'user/user.interface';


export interface IProduct extends Document {
    productTitle:string,
    quantityAvailable:number,
    photoUpload: string,
    description:string,
    price: number,
    quantityPerPrice:number,
    location:Types.Map<string>,
    currency?:string,
    productType?:string,
    sizes:Types.Array<string>,
    additionalProperty?:string,
    minimumOrderQuantity?:string,
    sellerId:IUser['_id'],
    createdAt:Date,
    modifiedAt:Date

}