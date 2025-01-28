import { MouseEvent } from "react";
import styled, { css } from "styled-components";
import Flex from "../styles/Flex";

type DialogCSSProps = {
  $variants?: 'layer'
  $width?: string
  $height?: string
  $borderRadius?: string
  $border?: string
  $backgroundColor?: string
  children?: React.ReactNode
  $minHeight?: string
  $maxWidth?: string
  $padding?: string
  $paddingTop?: string
  $paddingRight?: string
  $paddingLeft?: string
  $paddingBottom?: string
  $fontSize?: string
  $margin?: string
  $marginTop?: string
  $marginRight?: string
  $marginLeft?: string
  $marginBottom?: string
  $textAlign?: string
  $overFlow?:string
  onClick?: ((event: MouseEvent<HTMLDivElement>) => void)
}

const DialogCSS = styled.dialog<DialogCSSProps>`
  ${({ $variants,$overFlow }) => {
    switch ($variants) {
      case 'layer':
        return css`
          width:400px;
          height:auto;
          min-height:100px;
          border-radius:5px;
          position:fixed;
          top:3%;
          max-height:90vh;
          overflow-y:${$overFlow};
        `
      default:
        return css`
          max-width:1000px;
          padding:2rem;
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
          position:fixed;
          top:50%;
          left:50%;
          transform:translate(-100%,-50%);
        `
    }
  }}
  width:${({ $width }) => $width};
  height:${({ $height }) => $height};
  max-width:${({ $maxWidth }) => $maxWidth};
  min-height:${({ $minHeight }) => $minHeight};
  border-radius:${({ $borderRadius }) => $borderRadius};
  border:${({ $border = 'none' }) => $border};
  background-color:${({ theme, $backgroundColor }) => theme.colors.background || $backgroundColor};
  padding:${({ $padding }) => $padding};
  padding-top:${({ $paddingTop }) => $paddingTop};
  padding-left:${({ $paddingLeft }) => $paddingLeft};
  padding-right:${({ $paddingRight }) => $paddingRight};
  padding-bottom:${({ $paddingBottom }) => $paddingBottom};
  margin:${({ $margin }) => $margin};
  margin-top:${({ $marginTop }) => $marginTop};
  margin-right:${({ $marginRight }) => $marginRight};
  margin-left:${({ $marginLeft }) => $marginLeft};
  margin-bottom:${({ $marginBottom }) => $marginBottom};
  font-size:${({ $fontSize }) => $fontSize};
  text-align:${({ $textAlign }) => $textAlign};
`

const Div = styled.div<DialogCSSProps>`
${({ $variants }) => {
    switch ($variants) {
      case 'layer':
        return css`
        background-color:#c5c5c5;
        `
      default:
        return css`
        background-color:#4c4c4c;
        `
    }
  }}
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  opacity:70%;
`

const Dialog = (props: DialogCSSProps) => {
  const { onClick, children, ...rest } = props
  return (
    <div>
      <Div onClick={onClick} {...rest}></Div>
      <DialogCSS {...rest} open>
        <Flex $flex_direction="column">
          {children}
        </Flex>
      </DialogCSS>
    </div>
  )
}

export default Dialog