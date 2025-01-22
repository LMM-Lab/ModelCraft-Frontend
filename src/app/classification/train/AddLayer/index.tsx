'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Affine from "./LayerDialog/Affine";

const BackDiv = styled.div`
  width:100vw;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  background-color:#d5d5d5;
  opacity:50%;
`

const AddLayer = () => {
  const [isOpend, setIsOpend] = useState(false)
  const [layer, setLayer] = useState<string>('')

  const openDialog = () => {
    setIsOpend((isOpend) => !isOpend)
    setLayer('')
  }
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLayer(event.target.value)
  }
  return (
    <div>
      <Button backcolor="transparent" color="black" height="2rem" onClick={openDialog}>+ Add Layer</Button>
      {isOpend && (
        <div>
          <BackDiv onClick={openDialog}></BackDiv>
          <Dialog>
            <select onChange={handleSelect}>
              <option value=''></option>
              <option value="Affine">Affine</option>
              <option value="CNN">CNN</option>
              <option value="Pooling">Pooling</option>
            </select>
            {(layer === 'Affine') && (
              <Affine></Affine>
            )}
            {(layer === 'CNN') && (
              <Affine></Affine>
            )}
            {(layer === 'Pooling') && (
              <Affine></Affine>
            )}
          </Dialog>
        </div>
      )}
    </div>

  )
}

export default AddLayer