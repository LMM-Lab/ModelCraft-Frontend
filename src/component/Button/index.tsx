import styled from "styled-components"

type ButtonProps={
  onChange:string
  width:string
  height:string
  backgroundColor:string
}

const Button=styled.button<ButtonProps>`
  width:${({width})=>width};
  height:${({height})=>height};
  background-color:${({backgroundColor})=>backgroundColor};
`

export default Button