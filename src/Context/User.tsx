import { createContext, Dispatch, SetStateAction, useContext, } from "react";

export type UserType = {
  username: string
  email?:string
  icon?:string
}

export const UserContext = createContext<{
  user: UserType | undefined
  setUser: Dispatch<SetStateAction<UserType | undefined>>
} | undefined>(undefined)

export const useUser=()=>{
  const context=useContext(UserContext)
  if(!context){
    throw new Error('useUser未定義だよ')
  }
  return context
}