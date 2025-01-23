'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import Select from "@/component/common/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import InputParam from "./InputParam";

type FormData = {
  inputSize: number
  outputSize: number
  actFunc: string
  weightInit: string
}

const CNN = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      inputSize:23,
      outputSize:2,
      actFunc:'Sigmoid',
      weightInit:'Zelo',
    }
  })
  const handleInput: SubmitHandler<FormData> = (data) => {
    console.log('data:', data)
  }
  const gap = '0.7rem'

  return (
    <form onSubmit={handleSubmit(handleInput)}>
      <InputParam $marginTop="4rem" name="inputSize">
        <Input {...register('inputSize', { required: 'enter kernelSize' })} variants="params" type="number" min={0}></Input>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="outputSize">
        <Input {...register('outputSize', { required: 'enter poolingSize' })} variants="params" type="number" min={0}></Input>
        {errors.outputSize && <Text variants="Small" color="red">{errors.outputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="act func">
        <Select variants="param" {...register('actFunc', { required: 'enter act func' })}>
          <option value=""></option>
          <option value="Sigmoid">Sigmoid</option>
          <option value="Relu">Relu</option>
        </Select>
        {errors.actFunc && <Text variants="Small" color="red">{errors.actFunc.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="weight init">
        <Select variants="param" {...register('weightInit', { required: 'enter weight init' })}>
          <option value=""></option>
          <option value="Zelo">Zelo</option>
          <option value="Ramdom">Ramdom</option>
          <option value="Xavier">Xavier</option>
          <option value="He">He</option>
        </Select>
        {errors.weightInit && <Text variants="Small" color="red">{errors.weightInit.message}</Text>}
      </InputParam>

      <Button variants="Small" width="10rem" padding="0 1rem" $margin="2rem auto" display="block">Add</Button>
    </form>
  )
}

export default CNN