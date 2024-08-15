import axios, { AxiosResponse } from "axios"
import {IHttpResponse, IHttpClient} from '../services/types'

export const AxiosClient: IHttpClient =  {
    async get<T>(url: string): Promise<IHttpResponse<T>>{
        const res: AxiosResponse<T> = await axios.get(url)

        return {
            data: res.data,
            status: res.status
        }
    },

    async post<T, K>(url: string, body: K): Promise<IHttpResponse<T>> {
        const res: AxiosResponse<T> = await axios.post(url, body)

        return {
            data: res.data,
            status: res.status
        }
    },
}

