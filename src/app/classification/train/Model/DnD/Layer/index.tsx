'use client'
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { useState } from "react";
import styled,{css} from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type DivProps={
  name:string
}

type LayerProps={
  name:string
  input:string
  output:string
  onDelete?: () => void;
}

const DivContainer=styled.div`
  width:160px;
  height:75px;
  border:2px solid#d0cece;
  border-radius:10px;
`

const Div=styled.div<DivProps>`
  ${({name,theme})=>{
    switch(name){
      case 'Affine':
      return css`
        background-color:${theme.colors.model.Affine};
      `
      case 'CNN':
      return css`
        background-color:${theme.colors.model.CNN};
      `
      case 'Pooling':
      return css`
        background-color:${theme.colors.model.Pooling};
      `
      case 'LossFunc': 
      return css`
        background-color:${theme.colors.model.LossFunc};
      `
      default:
      return css`
        background-color:#157373;
      `
    }
  }}
  width:100%;
  height:27px;
  border-radius:8px 8px 0 0;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Button=styled.button`
  margin-left:0.5rem;`

const Layer=({name,input,output,onDelete}:LayerProps)=>{
  const [hoverd,setHovered]=useState<boolean>(false)

  return(
    <DivContainer>
      <Div name={name} onMouseEnter={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}}>
        <Text $variants="Medium" $fontSize="2rem">{name}</Text>
        {hoverd && <Button onClick={onDelete} onPointerDown={(e) => e.stopPropagation()}><FontAwesomeIcon icon={faTrash} /></Button>}
      </Div>
      <Flex $justify_content="space-around" $align_items="center">
        <Flex $flex_direction="column" $justify_content="center" $align_items="center">
          <Text $variants="Small" $marginTop="0.5rem" $fontSize="1.5rem">input</Text>
          <Text $variants="Small" $marginTop="0.5rem" $letterSpacing="-0.1em" $fontFamily='Arial, sans-serif'>{input}</Text>
        </Flex>
        <Flex $flex_direction="column" $justify_content="center" $align_items="center">
          <Text $variants="Small" $marginTop="0.5rem" $fontSize="1.5rem">output</Text>
          <Text $variants="Small" $marginTop="0.5rem" $letterSpacing="-0.1em" $fontFamily='Arial, sans-serif'>{output}</Text>
        </Flex>
      </Flex>
    </DivContainer>
  )
}

export default Layer