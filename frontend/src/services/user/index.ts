import { IUser } from '../../utils/types';
import {IHttpClient} from '../types'

export class UserService {
    private httpClient: IHttpClient;

    constructor(HttpClient: IHttpClient){
        this.httpClient = HttpClient
    }

    async getUserList(): Promise<IUser[]>{
        try {
            const res = await this.httpClient.get<IUser[]>('')
            return res.data
        }catch(err){
            console.log(err);
            return []
        }
    }

}