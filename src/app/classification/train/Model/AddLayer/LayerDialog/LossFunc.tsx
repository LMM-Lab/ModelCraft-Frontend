'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import Select from "@/component/common/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import InputParam from "./InputParam";

type FormData = {
lossFunc: string
}

const LossFunc = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      lossFunc:'Sigmoid',
    }
  })
  const handleInput: SubmitHandler<FormData> = (data) => {
    console.log('data:', data)
  }

  return (
    <form onSubmit={handleSubmit(handleInput)}>

      <InputParam $marginTop='4rem' name="lossFunc">
        <Select variants="param" {...register('lossFunc', { required: 'enter weight init' })}>
          <option value=""></option>
          <option value="Sigmoid">Sigmoid</option>
          <option value="Relu">Relu</option>
        </Select>
        {errors.lossFunc && <Text $variants="Small" color="red">{errors.lossFunc.message}</Text>}
      </InputParam>

      <Button $variants="Small" $width="10rem" $padding="0 1rem" $margin="2rem auto" $display="block">Add</Button>
    </form>
  )
}

export default LossFunc