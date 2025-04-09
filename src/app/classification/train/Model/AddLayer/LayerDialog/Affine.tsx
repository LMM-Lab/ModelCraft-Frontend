'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import Select from "@/component/common/Select";
import { useForm } from "react-hook-form";
import InputParam from "./InputParam";
import { LayerProps, TypeIO } from "../../types"; 

type FormData = {
  model:string
  inputSize: number
  outputSize: number
  actFunc: string
  weightInit: string
  io: TypeIO
}

const Affine = ({addParams,onClick,}:LayerProps) => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      model:'Affine',
      inputSize:23,
      outputSize:108,
      actFunc:'Sigmoid',
      weightInit:'Xavier',
      io:{
        input:[],
        output:[]
      }
    }
  })
  const handleFormSubmit=(data:FormData)=>{
    const params={
      ...data,
      id:new Date().getTime()
    }
    addParams(params)
    onClick()
  }
  const gap = '0.7rem'

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>

      <InputParam $marginTop='4rem' name="output size">
        <Input {...register('outputSize', { required: 'enter poolingSize',valueAsNumber: true})} $variants="params" type="number" min={0}></Input>
        {errors.outputSize && <Text $variants="Small" color="red">{errors.outputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="act func">
        <Select $variants="param" {...register('actFunc', { required: 'enter act func' })}>
          <option value="Relu">Relu</option>
          <option value="LeakyRelu">Leaky Relu</option>
          <option value="Sigmoid">Sigmoid</option>
          <option value="Tanh">Tanh</option>
          <option value="Softmax">Softmax</option>
        </Select>
        {errors.actFunc && <Text $variants="Small" color="red">{errors.actFunc.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="weight init">
        <Select $variants="param" {...register('weightInit', { required: 'enter weight init' })}>
          <option value="StandardNormal">Standard Normal</option>
          <option value="Ramdom">Ramdom</option>
          <option value="Xavier">Xavier</option>
          <option value="He">He</option>
        </Select>
        {errors.weightInit && <Text $variants="Small" color="red">{errors.weightInit.message}</Text>}
      </InputParam>

      <Button $variants="Small" $width="10rem" $padding="0 1rem" $margin="2rem auto" $display="block">Add</Button>
    </form>
  )
}

export default Affine