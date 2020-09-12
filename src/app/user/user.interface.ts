import {Document} from 'mongoose';
enum RegistrationStatus {
        Verified = 'VERIFIED',
        Unverified = 'UNVERIFIED'
}

 
export interface IUser extends Document {
    firstName:string;
    middleName?:string;
    lastName:string;
    phoneNumber:string;
    role:string;
    password:string
    registrationStatus:RegistrationStatus,
    createdAt:Date,
    modifiedAt:Date

}

