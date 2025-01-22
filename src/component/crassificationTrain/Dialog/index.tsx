'use client'
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import styled from "styled-components";

const Select=styled.select`
  width:100px;
  height:30px;
  border: 1px solid#333;
  border-radius:5px;
  margin-left:1rem;
  &:focus{
    outline:none;
  }
`

const Input=styled.input`
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

const Dialog=()=>{
  const [layer,setLayer]=useState<string>('')
  const handleSelect=(event:ChangeEvent<HTMLSelectElement>)=>{
    setLayer(event.target.value)
  }
  return (
    <dialog open>
      <select name="" onChange={handleSelect}>
        <option value=''></option>
        <option value="Affine">Affine</option>
        <option value="CNN">CNN</option>
        <option value="Pooling">Pooling</option>
      </select>
      {(layer==='Affine') && (
        <Flex $flex_direction="column" $justify_content="center" $align_items="center">
          <Flex $justify_content="flex-end">
            <Text variants='Medium'>input size</Text>
            <Input type="number" />
          </Flex>
          <Flex $justify_content="flex-end">
            <Text variants="Medium">output size</Text>
            <Input type="number" />
          </Flex>
          <Flex $justify_content="flex-end">
            <Text variants="Medium">activation func</Text>
            <Select name="">
              <option value="">Relu</option>
              <option value="">Skip</option>
            </Select>
          </Flex>
          <Flex $justify_content="flex-end">
            <Text variants="Medium">input size</Text>
            <Input type="number" />
          </Flex>
          <Button variants="Small" width="10rem" padding="1rem">Add</Button>
        </Flex>
      )}
      {(layer==='CNN') && (
        <div></div>
      )}
      {(layer==='Pooling') && (
        <div></div>
      )}
    </dialog>
  )
}

export default Dialog