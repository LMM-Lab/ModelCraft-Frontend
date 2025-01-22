import styled from "styled-components";

type DialogCSSProps={
  width?:string
  height?:string
  $borderRadius?:string
  $border?:string
  $backgroundColor?:string
}

const DialogCSS=styled.dialog<DialogCSSProps>`
  width:${({width='300px'})=>width};
  height:${({height='auto'})=>height};
  min-height:300px;
  border-radius:${({$borderRadius='5px'})=>$borderRadius};
  border:${({$border='1px solid#333'})=>$border};
  background-color:${({theme,$backgroundColor})=>theme.colors.background||$backgroundColor};
`

const Dialog=({children}:{children?:React.ReactNode})=>{
  return (
    <DialogCSS open>{children}</DialogCSS>
  )
}

export default Dialog