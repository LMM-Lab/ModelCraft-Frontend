'use client'
import styled,{css} from "styled-components"

type ButtonProps={
  onClick?:(event: React.ChangeEvent<HTMLInputElement>) => void;
  width?:string
  height?:string
  backcolor?:string
  variants?:'Small'|'Medium'|'Large'|'Icon'|'nav'
  children?:React.ReactNode
  borderRadius?:string
  padding?:string
  fontSize?:string
  $isactive?:boolean
  $marginTop?:string
  $marginRight?:string
  $marginLeft?:string
  type?:string
}

const Button=styled.button<ButtonProps>`
  background-color:${({backcolor,theme})=>backcolor||theme.colors.Button};
  ${({variants,theme,$isactive=false})=>{
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
          font-size:3.5rem;
          height:70px;
          width:70px;
        `
      case 'nav':
        return css`
          font-size:${theme.fontSize.Medium};
          border-radius:0!important;
          width:100%;
          height:80px;
          background-color:${$isactive ? theme.colors.isActive:theme.colors.sideBar};
          &:hover{
            background-color:${theme.colors.isActive} !important;
            color:white !important;
            border:none !important;
          }
        `
    }
  }};
  padding-left:${({padding})=>padding};
  padding-right:${({padding})=>padding};
  margin-top:${({$marginTop})=>$marginTop};
  margin-right:${({$marginRight})=>$marginRight};
  margin-left:${({$marginLeft})=>$marginLeft};
  font-size:${({fontSize})=>fontSize};
  border-radius:${({borderRadius='4px'})=>borderRadius};
  width:${({width})=>width};
  height:${({height})=>height};
  color:white;
  border:none;
  cursor: pointer;
  &:hover{
    background-color:white;
    color:${({theme})=>theme.colors.Button};
    border:1px solid${({theme})=>theme.colors.Button};
  }
`

export default Button