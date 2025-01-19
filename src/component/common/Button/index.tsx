'use client'
import styled,{css} from "styled-components"

type ButtonProps={
  onChange?:string
  height?:string
  backcolor?:string
  variants?:'Small'|'Medium'|'Large'|'Icon'
  children?:React.ReactNode
  borderRadius?:string
  padding?:string
  fontSize?:string
}

const Button=styled.button<ButtonProps>`
  ${({variants,theme})=>{
    switch (variants){
      case 'Small':
        return css`
          height:30px;
          padding:0 40px;
          font-size:${theme.fontSize.Small};
        `;
      case 'Medium':
        return css`
          height:70px;
          padding:0 40px;
          font-size:${theme.fontSize.Medium};
        `
      case 'Large':
        return css`
          height:80px;
          padding:0 40px;
          font-size:${theme.fontSize.Large};
        `
      case 'Icon':
        return css`
          font-size:35px;
          height:70px;
          width:70px;
        `
    }
  }};
  background-color:${({backcolor,theme})=>backcolor||theme.colors.Button};
  padding-left:${({padding})=>padding};
  padding-right:${({padding})=>padding};
  font-size:${({fontSize})=>fontSize};
  border:none;
  border-radius:4px;
  color:white;
  cursor: pointer;
  &:hover{
    background-color:white;
    color:${({theme})=>theme.colors.Button};
    border:1px solid${({theme})=>theme.colors.Button};
  }
`

export default Button