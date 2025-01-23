'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import InputParam from "./InputParam";

type FormData = {
  poolingSize: number
  stride:number
}

const Pooling = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      poolingSize:2,
      stride:3,
    }
  })
  const handleInput: SubmitHandler<FormData> = (data) => {
    console.log('data:', data)
  }
  const gap = '0.7rem'

  return (
    <form onSubmit={handleSubmit(handleInput)}>
      <InputParam $marginTop="4rem" name="poolingSize">
        <Input {...register('poolingSize', { required: 'enter kernelSize' })} variants="params" type="number" min={0}></Input>
        {errors.poolingSize && <Text $variants="Small" color="red">{errors.poolingSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="stride">
        <Input {...register('poolingSize', { required: 'enter poolingSize' })} variants="params" type="number" min={0}></Input>
        {errors.stride && <Text $variants="Small" color="red">{errors.stride.message}</Text>}
      </InputParam>

      <Button $variants="Small" width="10rem" $padding="0 1rem" $margin="2rem auto" display="block">Add</Button>
    </form>
  )
}

export default Pooling