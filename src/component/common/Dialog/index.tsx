import styled from "styled-components";

type DialogCSSProps={
  width?:string
  height?:string
  $borderRadius?:string
  $border?:string
  $backgroundColor?:string
  children?:React.ReactNode
}

const DialogCSS=styled.dialog<DialogCSSProps>`
  width:${({width='400px'})=>width};
  height:${({height='auto'})=>height};
  min-height:300px;
  border-radius:${({$borderRadius='5px'})=>$borderRadius};
  border:${({$border='1px solid#333'})=>$border};
  background-color:${({theme,$backgroundColor})=>theme.colors.background||$backgroundColor};
`

const Dialog=(props:DialogCSSProps)=>{
  return (
    <DialogCSS open {...props}>{props.children}</DialogCSS>
  )
}

export default Dialog