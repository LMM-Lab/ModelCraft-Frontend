'use client'
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import Affine from "./Layer/Affine";

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
    <dialog>
      <select name="" onChange={handleSelect}>
        <option value=''></option>
        <option value="Affine">Affine</option>
        <option value="CNN">CNN</option>
        <option value="Pooling">Pooling</option>
      </select>
      {(layer==='Affine') && (
        <Flex $flex_direction="column" $justify_content="center" $align_items="center">
          <Affine></Affine>
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