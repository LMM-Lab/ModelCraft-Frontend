'use client'
import Button from "@/component/common/Button"
import Dialog from "@/component/common/Dialog"
import Select from "@/component/common/Select"
import Input from "@/component/common/Input"
import Text from "@/component/common/Text"
import theme from "@/styles/theme"
import { ChangeEvent, useState } from "react"
import InputParam from "../AddLayer/LayerDialog/InputParam"
import { useForm } from "react-hook-form"

type FormData = {
  modelName: string
  epock: number
  batchSize: number
  learningRate: number
  optimizer: string
  valSize: string
}

const ModelSetting = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      epock: 1,
      batchSize: 32,
      learningRate: 1,
      optimizer:'Adam',
      valSize:'30%',
    }
  })
  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const gap = '0.7rem'
  return (
    <div>
      <Button onClick={toggleOpen} $border={`1px solid#ffffff`} $padding="0.1rem 0.5rem 2.2rem 0" $backColor="transparent" color="black" $height="2rem">+ Model Setting</Button>
      {isOpen && (
        <Dialog onClick={toggleOpen}>
          <Text $margin="2rem 0 0 2rem">Model Setting</Text>
          <InputParam name="model name" $marginTop="5rem">
            <Input {...register('modelName', { required: 'enter modelName' })} variants="params" type="text"></Input>
            {errors.modelName && <Text $variants="Small">{errors.modelName.message}</Text>}
          </InputParam>

          <InputParam name="epock" $marginTop={gap}>
            <Input {...register('epock', { required: 'enter epock' })} variants="params" type="number" min={0}></Input>
            {errors.epock && <Text $variants="Small">{errors.epock.message}</Text>}
          </InputParam>

          <InputParam name="batchSize" $marginTop={gap}>
            <Input {...register('batchSize', { required: 'enter batchSize' })} variants="params" type="number" min={0}></Input>
            {errors.batchSize && <Text $variants="Small">{errors.batchSize.message}</Text>}
          </InputParam>

          <InputParam name="learningRate" $marginTop={gap}>
            <Input {...register('learningRate', { required: 'enter learningRate' })} variants="params" type="number" min={0}></Input>
            {errors.learningRate && <Text $variants="Small">{errors.learningRate.message}</Text>}
          </InputParam>

          <InputParam name="optimizer" $marginTop={gap}>
            <Select variants="param" {...register('optimizer', { required: 'enter optimizer' })}>
              <option value=""></option>
              <option value="SGD">SGD</option>
              <option value="Momentum">Momentum</option>
              <option value="Adagrad">Adagrad</option>
              <option value="RMSProp">RMSProp</option>
              <option value="Adam">Adam </option>
            </Select>
            {errors.optimizer && <Text $variants="Small">{errors.optimizer.message}</Text>}
          </InputParam>

          <InputParam name="val size" $marginTop={gap}>
            <Select variants="param" {...register('valSize', { required: 'enter optimizer' })}>
              <option value=""></option>
              <option value="10%">10%</option>
              <option value="20%">20%</option>
              <option value="30%">30%</option>
              <option value="40%">40%</option>
              <option value="50%">50%</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="80%">80%</option>
              <option value="90%">90%</option>
              <option value="100%">100%</option>
            </Select>
            {errors.valSize && <Text $variants="Small">{errors.valSize.message}</Text>}
          </InputParam>
          <Button $variants="Small" $width="10rem" $padding="0 1rem" $margin="2rem auto" $display="block">Add</Button>
        </Dialog>
      )}
    </div>
  )
}

export default ModelSetting