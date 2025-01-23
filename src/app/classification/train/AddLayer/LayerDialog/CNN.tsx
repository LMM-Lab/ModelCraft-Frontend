'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import InputParam from "./InputParam";

type FormData = {
  inputSize: number
  outputSize: number
  activationFunc: string
  weightInit: string
}


const Select = styled.select`
  width:150px;
  height:30px;
  border: 1px solid#333;
  border-radius:5px;
  margin-left:1rem;
  padding-left:0.8rem;
  font-size:1.5rem;
  &:focus{
    outline:none;
  }
`

const CNN = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleInput: SubmitHandler<FormData> = (data) => {
    console.log('data:', data)
  }

  const gap = '0.7rem'

  return (
    <form onSubmit={handleSubmit(handleInput)}>
      <InputParam $marginTop="5rem" name="kernel size">
        <Input {...register('inputSize', { required: 'enter inputSize' })} variants="params" type="number"></Input>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="pooling size">
        <Input {...register('inputSize', { required: 'enter inputSize' })} variants="params" type="number"></Input>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="padding size">
        <Input {...register('inputSize', { required: 'enter inputSize' })} variants="params" type="number"></Input>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="stride">
        <Input {...register('inputSize', { required: 'enter inputSize' })} variants="params" type="number"></Input>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="act func">
        <Select {...register('inputSize', { required: 'enter inputSize' })}>
          <option value=""></option>
          <option value="Sigmoid">Sigmoid</option>
          <option value="Relu">Relu</option>
        </Select>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <InputParam $marginTop={gap} name="weight init">
        <Select {...register('inputSize', { required: 'enter inputSize' })}>
          <option value=""></option>
          <option value="Zelo">Zelo</option>
          <option value="Ramdom">Ramdom</option>
          <option value="Xavier">Xavier</option>
          <option value="He">He</option>
        </Select>
        {errors.inputSize && <Text variants="Small" color="red">{errors.inputSize.message}</Text>}
      </InputParam>

      <Button variants="Small" width="10rem" padding="0 1rem" $margin="2rem auto" display="block">Add</Button>
    </form>
  )
}

export default CNN