import {IHttpResponse, IHttpClient} from '../services/types'

export const FetchClient: IHttpClient = {
    async get<T>(url: string): Promise<IHttpResponse<T>>{
        const res = await fetch(url);
        const data = await res.json()
        return {
            data,
            status: res.status,            
        }
    },

    async post<T, K>(url: string, body: K): Promise<IHttpResponse<T>>{
        const res =  await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await res.json()

        return {
            data,
            status: res.status
        }
    }
}