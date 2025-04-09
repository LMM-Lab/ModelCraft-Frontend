"use client";
import styled, { css } from "styled-components";

type TextProps={
  $variants?:'ExtraSmall'|'Small'|'Medium'|'Large'|'ExtraLarge'
  $fontSize?:string
  $fontWeight?:string
  $letterSpacing?:string
  $fontFamily?:string
  $width?:string
  $height?:string
  $padding?:string
  $paddingTop?:string
  $paddingRight?:string
  $paddingLeft?:string
  $paddingBottom?:string
  $margin?:string
  $marginTop?:string
  $marginRight?:string
  $marginLeft?:string
  $marginBottom?:string
  $color?:string
  $textOverflow?:string
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
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing};
  font-family: ${({ $fontFamily }) => $fontFamily};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  padding-top: ${({ $paddingTop }) => $paddingTop};
  padding-right: ${({ $paddingRight }) => $paddingRight};
  padding-left: ${({ $paddingLeft }) => $paddingLeft};
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom};
  margin: ${({ $margin }) => $margin};
  margin-top: ${({ $marginTop }) => $marginTop};
  margin-right: ${({ $marginRight }) => $marginRight};
  margin-left: ${({ $marginLeft }) => $marginLeft};
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  display:inline-block;
  text-overflow: ${({ $textOverflow }) => $textOverflow};
`

export default Text