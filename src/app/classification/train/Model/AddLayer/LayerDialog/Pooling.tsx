'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import { useForm } from "react-hook-form";
import InputParam from "./InputParam";
import { LayerProps, TypeIO } from "../../types"; 

type FormData = {
  model:string
  kernel: number
  stride:number
  padding:number
  io: TypeIO
}

const Pooling = ({addParams,onClick}:LayerProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      model:'Pooling',
      kernel:2,
      stride:3,
      padding:2,
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
      <InputParam $marginTop="4rem" name="pooling">
        <Input {...register('kernel', { required: 'enter kernelSize' })} $variants="params" type="number" min={0}></Input>
        {errors.kernel && <Text $variants="Small" color="red">{errors.kernel.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="stride">
        <Input {...register('stride', { required: 'enter pooling' })} $variants="params" type="number" min={0}></Input>
        {errors.stride && <Text $variants="Small" color="red">{errors.stride.message}</Text>}
      </InputParam>

      <Button $variants="Small" $width="10rem" $padding="0 1rem" $margin="2rem auto" $display="block">Add</Button>
    </form>
  )
}

export default Pooling