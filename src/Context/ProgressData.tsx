import { createContext, Dispatch, SetStateAction, useContext, } from "react";

export type ProgressDataType = {
  target_user: string
  epoch: number
  max_epoch:number
  train_time: number
  loss_json: {
    train: number
    val: number
  }
  acc_json: {
    train: number
    val: number
  }
}

export const ProgressDataContext = createContext<{
  progressData: ProgressDataType | undefined
  setProgressData: Dispatch<SetStateAction<ProgressDataType | undefined>>
} | undefined>(undefined)

export const useProgressData=()=>{
  const context=useContext(ProgressDataContext)
  if(!context){
    throw new Error('useProgressData未定義だよ')
  }
  return context
}