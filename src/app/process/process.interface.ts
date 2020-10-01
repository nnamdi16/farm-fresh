import {Document} from 'mongoose';
import {IProcessType} from '../processType/processType.interface'
import {IUser} from '../user/user.interface';

enum ProcessStatus {
    Pending = 'PENDING',
    Expired = 'EXPIRED',
    Success = 'SUCCESS'
}

export interface IProcess extends Document {
    processTypeId: IProcessType['_id'],
    createdBy: IUser['_id'],
    updatedBy: IUser['_id'],
    processCode: string,
    processStatus: ProcessStatus,
    token: string,
    createdAt: Date,
    modifiedAt: Date
}