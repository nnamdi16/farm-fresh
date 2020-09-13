import {Document} from 'mongoose';

export interface IProcessType extends Document {
    processTypeId:string,
    description:string
}