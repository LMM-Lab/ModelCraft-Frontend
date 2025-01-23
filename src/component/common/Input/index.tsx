'use client'
import styled, { css } from "styled-components";
import React, { forwardRef } from "react";

type InputProps=React.InputHTMLAttributes<HTMLInputElement>&{
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
  variants?:'default'|'serch'|'params'
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string
  $textAlign?:string
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
      case 'params':
        return css`
          width:150px;
          height:30px;
          border: 1px solid#333;
          border-radius:5px;
          margin-left:1rem;
          padding-left:0.8rem;
          font-size:1.5rem;
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

const Input=forwardRef<HTMLInputElement,InputProps>(
  (props,ref)=>{
    return <InputCSS ref={ref} {...props}/>
  })

export default Input