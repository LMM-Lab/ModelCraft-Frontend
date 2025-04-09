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
  kernel: number
  filters: number
  padding:number
  stride:number
  inputChannel:number
  actFunc: string
  weightInit: string
  io: TypeIO
}

const CNN = ({addParams,onClick}:LayerProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      model:'CNN',
      kernel:3,
      filters:32,
      padding:1,
      stride:1,
      inputChannel:3,
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
      <InputParam $marginTop="4rem" name="kernel">
        <Input {...register('kernel', { required: 'enter kernel' })} $variants="params" type="number" min={0}></Input>
        {errors.kernel && <Text $variants="Small" color="red">{errors.kernel.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="filters">
        <Input {...register('filters', { required: 'enter filters' })} $variants="params" type="number" min={0}></Input>
        {errors.filters && <Text $variants="Small" color="red">{errors.filters.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="padding">
        <Input {...register('padding', { required: 'enter padding' })} $variants="params" type="number" min={0}></Input>
        {errors.padding && <Text $variants="Small" color="red">{errors.padding.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="stride">
        <Input {...register('stride', { required: 'enter stride' })} $variants="params" type="number" min={0}></Input>
        {errors.stride && <Text $variants="Small" color="red">{errors.stride.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="input channel">
        <Input {...register('inputChannel', { required: 'enter poolingSize' })} $variants="params" type="number" min={0}></Input>
        {errors.inputChannel && <Text $variants="Small" color="red">{errors.inputChannel.message}</Text>}
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

export default CNN