"use client";
import styled, { css } from "styled-components";

type TextProps={
  $variants?:'ExtraSmall'|'Small'|'Medium'|'Large'|'ExtraLarge'
  fontSize?:string
  color?:string
  fontWeight?:string
  letterSpacing?:string
  margin?:string
  padding?:string
  $marginTop?:string
  fontFamily?:string
  width?:string
}

const Text=styled.p<TextProps>`
  ${({$variants='Medium'})=>{
    switch ($variants){
      case 'ExtraSmall':
        return css`
          font-size:1.3rem;
          font-weight:300;
          letter-spacing:0rem;
        `
      case 'Small':
        return css`
          font-size:1.3rem;
          font-weight:400;
          letter-spacing:0rem;
        `
      case 'Medium':
        return css`
          font-size:2.5rem;
          font-weight:400;
          letter-spacing:-0.1rem;
        `
      case 'Large':
        return css`
          font-size:3rem;
          font-weight:400;
          letter-spacing:-0.1rem;
        `
      case 'ExtraLarge':
        return css`
          font-size:3.5rem;
          font-weight:400;
          letter-spacing:-0.2rem;
        `
    }
  }}
  color:${({color})=>color};
  width:${({width})=>width};
  font-size:${({fontSize})=>fontSize};
  font-weight:${({fontWeight})=>fontWeight};
  letter-spacing:${({letterSpacing})=>letterSpacing};
  margin:${({margin})=>margin};
  margin-top:${({$marginTop})=>$marginTop};
  padding:${({padding})=>padding};
  font-family:${({fontFamily})=>fontFamily};
  display:inline-block;
`

export default Text