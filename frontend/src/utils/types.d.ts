export interface IUser {
  id: string;
  name: string;
  email: string;
  workload: string;
  role: string;
  wage: number;
  createdAt: string;
}

interface IUserPost extends IUser {
  password: string
}

export type TUserPost = Omit<IUserPost, 'id', 'createdAt'>
export type TUserPut = Omit<IUserPost, 'id', 'password', 'createdAt'>

export interface ISelect {
  label: string;
  value: string;
}