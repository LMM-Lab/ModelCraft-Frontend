'use client'
import styled,{css} from "styled-components"

type ButtonProps={
  onChange?:string
  height?:string
  backcolor?:string
  size?:'small'|'large'
  children?:string
  borderRadius?:string
  padding?:string
}

const Button=styled.button<ButtonProps>`
  background-color:${({backcolor,theme})=>backcolor||theme.colors.Button};
  border:none;
  border-radius:4px;
  color:white;
  ${({size,theme})=>{
    switch (size){
      case 'small':
        return css`
          height:30px;
          padding:0 40px;
          font-size:${theme.fontSize.Small};
        `;
      default:
        return css`
          height:70px;
          padding:0 50px;
          font-size:${theme.fontSize.Large};
        `
    }
  }};
  padding-left:${({padding})=>padding};
  padding-right:${({padding})=>padding};
  &:hover{
    background-color:white;
    color:${({theme})=>theme.colors.Button};
    border:1px solid${({theme})=>theme.colors.Button};
  }
`

export default Button