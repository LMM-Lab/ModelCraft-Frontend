import styled from "styled-components";

type TextProps={
  fontSize:string
  color:string
}

const Text=styled.p<TextProps>`
  color:${({color})=>color};
  font-size:${({fontSize})=>fontSize};
`