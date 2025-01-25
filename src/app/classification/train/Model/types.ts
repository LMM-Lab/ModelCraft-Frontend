export type TypeIO = {
  input: number[]
  output: number[]
}

export type AffineParams = {
  model: string
  id: number
  outputSize: number
  actFunc?: string
  weightInit?: string
  io: TypeIO
}

export type CNNParams = {
  model: string
  id: number
  filters: number
  kernel: number
  stride: number
  padding: number
  inputChannel:number
  actFunc?: string
  weightInit?: string
  io: TypeIO
}

export type PoolingParams = {
  model: string
  id: number
  kernel: number
  stride: number
  padding:number
  io: TypeIO
}

export type LossFuncParams = {
  model: string
  id: number
  lossFunc: string
  io: TypeIO
}

export type paramsProps=AffineParams|CNNParams|PoolingParams|LossFuncParams

export type LayerProps={
  addParams:(param: paramsProps) => void
  onClick:()=>void
}