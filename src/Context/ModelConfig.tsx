import { createContext, Dispatch, SetStateAction, useContext, } from "react";

export type ModelConfigType = {
  modelName: string
  epock: number
  batchSize: number
  learningRate: number
  optimizer: string
  valSize: string
  label: { [key: string]: string }[]
  resorce: string
  local?: string
  GoogleColab?: string
}

export const ModelConfigContext = createContext<{
  modelConfig: ModelConfigType | undefined
  setModelConfig: Dispatch<SetStateAction<ModelConfigType | undefined>>
} | undefined>(undefined)

export const useModelConfig=()=>{
  const context=useContext(ModelConfigContext)
  if(!context){
    throw new Error('useModelConfig 未定義だよ')
  }
  return context
}