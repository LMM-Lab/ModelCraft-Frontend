'use client'
import styled, { css } from "styled-components";
import { BoxProps } from "../styles/Box";

type InputProps=BoxProps&{
  variants?:'default'|'serch'
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string
}

const InputCSS=styled.input<InputProps>`
  ${({variants,theme})=>{
    switch (variants){
      case 'default':
        return css`
          width:48rem;
          height:7rem;
          font-size:${theme.fontSize.Medium};
        `
      case 'serch':
        return css`
          
        `
    }
  }}
  color:${({color})=>color};
  background-color:${({$backgroundColor,theme})=>$backgroundColor||theme.colors.white};
  width:${({$width})=>$width};
  height:${({$height})=>$height};
  min-width:${({$minWidth})=>$minWidth};
  min-height:${({$minHeight})=>$minHeight};
  display:${({$display})=>$display};
  border:${({$border})=>$border};
  overflow:${({$overflow})=>$overflow};
  margin:${({$margin})=>$margin};
  margin-top:${({$marginTop})=>$marginTop};
  margin-right:${({$marginRight})=>$marginRight};
  margin-bottom:${({$marginBottom})=>$marginBottom};
  margin-left:${({$marginLeft})=>$marginLeft};
  padding:${({$padding})=>$padding};
  padding-top:${({$paddingTop})=>$paddingTop};
  padding-right:${({$paddingRight})=>$paddingRight};
  padding-bottom:${({$paddingBottom})=>$paddingBottom};
  padding-left:${({$paddingLeft='1rem'})=>$paddingLeft};
  &:focus{
    outline:none;
  }
`

const Input=(props:InputProps)=>{
  return (
    <InputCSS {...props}/>
  )
}

export default Input