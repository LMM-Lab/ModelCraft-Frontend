'use client'
import Button from "@/component/common/Button";
import Text from "@/component/common/Text";
import Select from "@/component/common/Select";
import { useForm } from "react-hook-form";
import InputParam from "./InputParam";
import { LayerProps, TypeIO } from "../../types"; 

type FormData = {
  model:string
  lossFunc: string
  io: TypeIO
}

const LossFunc = ({addParams,onClick}:LayerProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues:{
      model:'LossFunc',
      lossFunc:'CrossEntropy',
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>

      <InputParam $marginTop='4rem' name="loss func">
        <Select $variants="param" {...register('lossFunc', { required: 'enter weight init' })}>
          <option value="CrossEntropy">Cross Entropy</option>
          {/* <option value="BinaryCrossEntropy">Binary Cross Entropy</option> */}
        </Select>
        {errors.lossFunc && <Text $variants="Small" color="red">{errors.lossFunc.message}</Text>}
      </InputParam>

      <Button $variants="Small" $width="10rem" $padding="0 1rem" $margin="2rem auto" $display="block">Add</Button>
    </form>
  )
}

export default LossFunc