'use client'
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Text from "@/component/common/Text";
import Select from "@/component/common/Select";
import { useForm } from "react-hook-form";
import InputParam from "./InputParam";
import { paramsProps } from "../..";

type FormData = {
  model:string
  lossFunc: string
}

const LossFunc = ({onSubmit}:{onSubmit:(params:paramsProps)=>void}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      model:'LossFunc',
      lossFunc:'Sigmoid',
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

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