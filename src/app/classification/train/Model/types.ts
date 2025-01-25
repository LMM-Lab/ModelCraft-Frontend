export type AffineParams = {
  model: string
  id: number
  inputSize: number
  outputSize: number
  actFunc?: string
  weightInit?: string
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
}

export type PoolingParams = {
  model: string
  id: number
  kernel: number
  stride: number
  padding:number
}

export type LossFuncParams = {
  model: string
  id: number
  lossFunc: string
}

export type TypeIO = {
  model: 'Affine' | 'CNN' | 'Pooling' | 'LossFunc'
  id:number
  input: number[]
  output: number[]
}

export type paramsProps=AffineParams|CNNParams|PoolingParams|LossFuncParams|TypeIO

export type LayerProps={
  onSubmit:(param: paramsProps) => void
  onClick:()=>void
}