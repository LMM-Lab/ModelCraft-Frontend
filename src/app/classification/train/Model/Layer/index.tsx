'use client'
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import styled from "styled-components";

type DivProps={
  $backgroundColor?:string
}

type LayerProps={
  name:string
  input:string
  output:string
}

const DivContainer=styled.div`
  width:160px;
  height:75px;
  border:2px solid#d0cece;
  border-radius:10px;
`

const Div=styled.div<DivProps>`
  width:100%;
  height:27px;
  border-radius:8px 8px 0 0;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:${({$backgroundColor='#90bbbb'})=>$backgroundColor};
`

const Layer=({name,input,output}:LayerProps)=>{
  return(
    <DivContainer>
      <Div><Text variants="Medium" fontSize="2rem">{name}</Text></Div>
      <Flex $justify_content="space-around" $align_items="center">
        <Flex $flex_direction="column" $justify_content="center" $align_items="center">
          <Text variants="Small" $marginTop="0.5rem" fontSize="1.5rem">input</Text>
          <Text variants="Small" $marginTop="0.5rem" letterSpacing="-0.1em" fontFamily='Arial, sans-serif'>{input}</Text>
        </Flex>
        <Flex $flex_direction="column" $justify_content="center" $align_items="center">
          <Text variants="Small" $marginTop="0.5rem" fontSize="1.5rem">output</Text>
          <Text variants="Small" $marginTop="0.5rem" letterSpacing="-0.1em" fontFamily='Arial, sans-serif'>{output}</Text>
        </Flex>
      </Flex>
    </DivContainer>
  )
}

export default Layer