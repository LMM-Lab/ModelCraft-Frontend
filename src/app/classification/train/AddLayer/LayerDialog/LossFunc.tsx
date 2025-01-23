'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import InputParam from "./InputParam";

type FormData = {
lossFunc: string
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
        <Select {...register('lossFunc', { required: 'enter weight init' })}>
          <option value=""></option>
          <option value="Sigmoid">Sigmoid</option>
          <option value="Relu">Relu</option>
        </Select>
        {errors.lossFunc && <Text variants="Small" color="red">{errors.lossFunc.message}</Text>}
      </InputParam>

      <Button variants="Small" width="10rem" padding="0 1rem" $margin="2rem auto" display="block">Add</Button>
    </form>
  )
}

export default LossFunc