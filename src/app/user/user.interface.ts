enum RegistrationStatus {
        Verified = 'VERIFIED',
        Unverified = 'UNVERIFIED'
}

 
interface IUserSchema extends Document {
    firstName:string;
    middleName?:string;
    lastName:string;
    phoneNumber:string;
    role:string;
    password:string
    registrationStatus:RegistrationStatus

}