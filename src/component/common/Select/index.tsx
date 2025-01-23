import { forwardRef } from "react";
import styled, { css } from "styled-components";

type SelectProps=React.SelectHTMLAttributes<HTMLSelectElement>&{
  $color?: string
  $backgroundColor?: string
  $width?: string
  $height?: string
  $minWidth?: string
  $minHeight?: string
  $display?: string
  $border?: string
  $overflow?: string
  $margin?: string
  $marginTop?: string
  $marginRight?: string
  $marginBottom?: string
  $marginLeft?: string
  $padding?: string
  $paddingTop?: string
  $paddingRight?: string
  $paddingBottom?: string
  $paddingLeft?: string
  $borderButton?:string
  $borderRadius?:string
  variants?:'param'
  placeholder?:string
  $textAlign?:string
}

const SelectCSS=styled.select<SelectProps>`
  ${({variants})=>{
    switch(variants){
      case 'param':
        return css`
          width:150px;
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
  text-align:${({$textAlign})=>$textAlign};
  &:focus{
    outline:none;
  }
`

const Select=forwardRef<HTMLSelectElement,SelectProps>((props,ref)=>{
  return <SelectCSS {...props} ref={ref}></SelectCSS>
})

export default Select