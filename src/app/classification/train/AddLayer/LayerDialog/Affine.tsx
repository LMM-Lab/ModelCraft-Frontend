'use client'
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const Select = styled.select`
  width:100px;
  height:30px;
  border: 1px solid#333;
  border-radius:5px;
  margin-left:1rem;
  &:focus{
    outline:none;
  }
`

const Input = styled.input`
  width:100px;
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

type FormData = {
  inputSize: number
  outputSize: number
  activationFunc: string
  weightInit: string
}

const Affine = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleInput: SubmitHandler<FormData> = (data) => {
    console.log('data:', data)
  }

  return (
    <form onSubmit={handleSubmit(handleInput)}>
      <Flex $flex_direction="column" $justify_content="center" $align_items="center">
        <div>

          <Flex $flex_direction="column" $align_items='flex-end'>
            <Flex>
              <Text variants='Medium'>input size</Text>
              <Input type="number" {...register('inputSize', { required: 'enter' })} />
            </Flex>
            {errors.inputSize && <Text color="red" variants="Small">enter input-size</Text>}
          </Flex>

          <Flex $flex_direction="column" $align_items='flex-end'>
            <Flex>
              <Text variants='Medium'>input size</Text>
              <Input type="number" {...register('outputSize', { required: 'enter' })} />
            </Flex>
            {errors.outputSize && <Text color="red" variants="Small">enter output-size</Text>}
          </Flex>

          <Flex $flex_direction="column" $align_items='flex-end'>
            <Flex>
              <Text variants="Medium">activation func</Text>
              <Select {...register('activationFunc', { required: 'enter activationFunc' })}>
                <option value="Relu">Relu</option>
                <option value="Skip">Skip</option>
              </Select>
            </Flex>
            {errors.activationFunc && <Text color="red" variants="Small">enter activationFunc</Text>}
          </Flex>

          <Flex $flex_direction="column" $align_items='flex-end'>
            <Flex>
              <Text variants="Medium">activation func</Text>
              <Select {...register('weightInit', { required: 'enter weightInit' })}>
                <option value=""></option>
                <option value="Relu">Relu</option>
                <option value="Skip">Skip</option>
              </Select>
            </Flex>
            {errors.weightInit && <Text color="red" variants="Small">enter weightInit</Text>}
          </Flex>

        </div>
        <Button variants="Small" width="10rem" padding="1rem">Add</Button>
      </Flex>
    </form>
  )
}

export default Affine