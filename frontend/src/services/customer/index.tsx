import { ICustomer, TCustomerPost } from "../../utils/types";
import { IHttpClient } from "../types";

export class CustomerService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getCustomerList(): Promise<ICustomer[]> {
    try {
      const res = await this.httpClient.get<ICustomer[]>("/customer");

      return res.data;
    } catch {
      return [];
    }
  }

  async createCustomer(customer: TCustomerPost) {
    await this.httpClient
      .post("customer", customer)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async delete(id: string): Promise<ICustomer | void> {
    try {
      const res = await this.httpClient.delete<ICustomer>(`/customer/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
