'use client'
import Button from "@/component/common/Button"
import Dialog from "@/component/common/Dialog"
import Input from "@/component/common/Input"
import Select from "@/component/common/Select"
import Text from "@/component/common/Text"
import { ModelConfigType, useModelConfig } from "@/Context/ModelConfig"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import styled from "styled-components"
import InputParam from "../AddLayer/LayerDialog/InputParam"

const SetSection = styled.div`
  width:11rem;
  height:3.8rem;
  border-left:0.4rem solid#5C92FF;
  margin:4rem 0 2rem 4rem;
  padding-left:1rem;
  display:flex;
  justify-content:flex-start;
  align-items:center;
`

const ModelSetting = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [resorce, setResorce] = useState<string>('Local')
  const {modelConfig,setModelConfig}=useModelConfig()
  const { control, register, handleSubmit, formState: { errors }, watch } = useForm<ModelConfigType>({
    defaultValues: {
      modelName:'test19',
      epock: 7,
      batchSize: 32,
      learningRate: 0.01,
      optimizer: 'Adam',
      valSize: '0.3',
      label: [{}],
      resorce: 'Local',
      local: 'CPU',
      GoogleColab: 'T4',
    }
  })

  const selectResorce = watch('resorce')

  useEffect(() => {
    setResorce(selectResorce)
  }, [selectResorce])
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'label',
  })
  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const handleFormSubmit = (data: ModelConfigType) => {
    setModelConfig(data)
    setIsOpen(false)
  }

  const gap = '0.7rem'
  return (
    <div>
      <Button onClick={toggleOpen} $border={`1px solid#ffffff`} $paddingRight="1rem" $backColor="transparent" $color="black" $height="3rem">+ Model Setting</Button>
      {isOpen && (
        <Dialog onClick={toggleOpen} $variants="layer" $overFlow="scroll">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Text $margin="2rem 0 0 2rem">Model Setting</Text>

            <SetSection><Text $variants="Medium">main</Text></SetSection>
            <InputParam name="model name" $marginTop={gap}>
              <Input {...register('modelName', { required: 'Enter Model Name' })} $variants="params" type="text"></Input>
              {errors.modelName && <Text $variants="Small" $color="red">{errors.modelName.message}</Text>}
            </InputParam>

            <InputParam name="epock" $marginTop={gap}>
              <Input {...register('epock', { required: 'Enter Epock' })} $variants="params" type="number" min={0}></Input>
              {errors.epock && <Text $variants="Small" $color="red">{errors.epock.message}</Text>}
            </InputParam>

            <InputParam name="batch size" $marginTop={gap}>
              <Input {...register('batchSize', { required: 'Enter Batch Size' })} $variants="params" type="number" min={0}></Input>
              {errors.batchSize && <Text $variants="Small" $color="red">{errors.batchSize.message}</Text>}
            </InputParam>

            <InputParam name="learning rate" $marginTop={gap}>
              <Input {...register('learningRate', { required: 'Enter Learning Rate' })} $variants="params" type="number" step="any"></Input>
              {errors.learningRate && <Text $variants="Small" $color="red">{errors.learningRate.message}</Text>}
            </InputParam>

            <InputParam name="optimizer" $marginTop={gap}>
              <Select $variants="param" {...register('optimizer')}>
                <option value="SGD">SGD</option>
                {/* <option value="Momentum">Momentum</option> */}
                <option value="Adagrad">Adagrad</option>
                <option value="RMSprop">RMSprop</option>
                <option value="Adam">Adam </option>
              </Select>
              {errors.optimizer && <Text $variants="Small">{errors.optimizer.message}</Text>}
            </InputParam>

            <InputParam name="val size" $marginTop={gap}>
              <Select $variants="param" {...register('valSize')}>
                <option value="0.1">10%</option>
                <option value="0.2">20%</option>
                <option value="0.3">30%</option>
                <option value="0.4">40%</option>
                <option value="0.5">50%</option>
                <option value="0.6">60%</option>
                <option value="0.7">70%</option>
                <option value="0.8">80%</option>
                <option value="0.9">90%</option>
                <option value="1">100%</option>
              </Select>
            </InputParam>

            {/* <SetSection><Text $variants="Medium">label</Text></SetSection>
            {fields.map((field, index) => (
              <Flex key={index} $flex_direction="column" $align_items="flex-end" $marginRight="6rem">
                <Flex $justify_content="center" $align_items="flex-end">
                  <Input {...register(`label.${index}.number`)} min={0} $marginTop={gap} type='number' $variants="params" $width="5rem" defaultValue='0'></Input>
                  <Input {...register(`label.${index}.label`, { required: 'Enter Label Name' })} $marginTop={gap} type='text' $variants="params"></Input>
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#5569A1', fontSize: '1rem', margin: '0 0 0 0.5rem' }} onClick={() => remove(index)} />
                </Flex>
                {errors.label?.[index]?.label && <Text $variants="Small" $color="red">{errors.label[index].label.message}</Text>}
              </Flex>
            ))}
            <Button $width="5rem" $margin="2rem 6rem 0 auto" onClick={() => append({ 'number': `${fields.length}`, 'label': '' })} type="button"><Text $variants="Small">+</Text></Button> */}

              {/* <SetSection><Text $variants="Medium">resorce</Text></SetSection>
              <InputParam name="resorce" $marginTop={gap}>
                <Select $variants="param" {...register('resorce')}>
                  <option value="Local">Local</option>
                  <option value="GoogleColab">GoogleColab</option>
                </Select>
              </InputParam>

              {resorce === 'Local' && (
                <InputParam name="local" $marginTop={gap}>
                  <Select $variants="param" {...register('local')}>
                    <option value="CPU">CPU</option>
                    <option value="GPU">GPU</option>
                  </Select>
                </InputParam>
              )}

              {resorce === 'GoogleColab' && (
                <InputParam name="google colab" $marginTop={gap}>
                  <Select $variants="param" {...register('GoogleColab')}>
                    <option value="CPU">CPU</option>
                    <option value="T4">T4</option>
                  </Select>
                </InputParam>
              )} */}

            <Button type="submit" $variants="Small" $width="10rem" $padding="0 1rem" $margin="5rem auto 2rem auto" $display="block">Add</Button>
          </form>
        </Dialog>
      )}
    </div>
  )
}

export default ModelSetting