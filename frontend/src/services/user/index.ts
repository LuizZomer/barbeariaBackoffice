import { IUser } from "../../utils/types";
import { IHttpClient } from "../types";

export class UserService {
  private httpClient: IHttpClient;

  constructor(HttpClient: IHttpClient) {
    this.httpClient = HttpClient;
  }

  async getUserList({role}: {role: string}): Promise<IUser[]> {
    try {
      const res = await this.httpClient.get<IUser[]>(`/users?role=${role}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
