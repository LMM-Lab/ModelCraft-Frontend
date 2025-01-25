'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import Select from "@/component/common/Select";
import { useForm } from "react-hook-form";
import InputParam from "./InputParam";
import { LayerProps } from "../../types"; 

type FormData = {
  model:string
  lossFunc: string
}

const LossFunc = ({onSubmit,onClick}:LayerProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      model:'LossFunc',
      lossFunc:'Sigmoid',
    }
  })
  const handleFormSubmit=(data:FormData)=>{
    const params={
      ...data,
      id:new Date().getTime()
    }
    onSubmit(params)
    onClick()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>

      <InputParam $marginTop='4rem' name="lossFunc">
        <Select $variants="param" {...register('lossFunc', { required: 'enter weight init' })}>
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