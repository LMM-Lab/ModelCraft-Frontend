import { MouseEvent } from "react";
import styled from "styled-components";

type DialogCSSProps={
  width?:string
  height?:string
  $borderRadius?:string
  $border?:string
  $backgroundColor?:string
  children?:React.ReactNode
  onClick?:((event:MouseEvent<HTMLDivElement>)=>void)
}

const DialogCSS=styled.dialog<DialogCSSProps>`
  width:${({width='400px'})=>width};
  height:${({height='auto'})=>height};
  min-height:100px;
  border-radius:${({$borderRadius='5px'})=>$borderRadius};
  border:${({$border='1px solid#333'})=>$border};
  background-color:${({theme,$backgroundColor})=>theme.colors.background||$backgroundColor};
`

const Div = styled.div`
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  background-color:#d5d5d5;
  opacity:50%;
`

const Dialog=(props:DialogCSSProps)=>{
  const {onClick,...rest}=props
  return (
    <div>
      <Div onClick={onClick}></Div>
      <DialogCSS open {...rest}>{props.children}</DialogCSS>
    </div>
  )
}

export default Dialog