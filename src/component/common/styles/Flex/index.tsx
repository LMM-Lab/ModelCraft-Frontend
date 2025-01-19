import styled from "styled-components";
import Box from "../Box";

type FlexProps={
  $flex_direction?:string
  $flex_wrap?:string
  $flex_flow?:string
  $justify_content?:string 
  $align_items?:string
  $align_content?:string
  $gap?:string
  $row_gap?:string
  $column_gap?:string
}

const Flex=styled(Box)<FlexProps>`
  flex-direction:${({$flex_direction})=>$flex_direction};
  flex-wrap:${({$flex_wrap})=>$flex_wrap};
  flex-flow:${({$flex_flow})=>$flex_flow};
  justify-content:${({$justify_content='center'})=>$justify_content};
  align-items:${({$align_items='center'})=>$align_items};
  align-content:${({$align_content})=>$align_content};
  gap:${({$gap})=>$gap};
  row-gap:${({$row_gap})=>$row_gap};
  column-gap:${({$column_gap})=>$column_gap};
  display:flex;
`

export default Flex