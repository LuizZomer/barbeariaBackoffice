import { JwtPayload } from "jwt-decode"
import { IUser } from "../../utils/types"

export interface IAuthContext {
    user: JwtPayload | null
    signIn: (token: string) => void
    signOut: () => void
  }
  