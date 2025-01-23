'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Affine from "./LayerDialog/Affine";
import CNN from "./LayerDialog/CNN";
import Pooling from "./LayerDialog/Pooling";
import LossFunc from "./LayerDialog/LossFunc";
import Select from "@/component/common/Select";

const Div = styled.div`
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
    setLayer('Affine')
  }
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLayer(event.target.value)
  }
  return (
    <div>
      <Button backcolor="transparent" color="black" height="2rem" onClick={openDialog}>+ Add Layer</Button>
      {isOpend && (
        <div>
          <Div onClick={openDialog}></Div>
          <Dialog width="40rem">
            <Select variants="param" $width="11rem" $marginTop="1rem" defaultValue={'Affine'} onChange={handleSelect}>
              <option value="Affine">Affine</option>
              <option value="CNN">CNN</option>
              <option value="Pooling">Pooling</option>
              <option value="LossFunc">LossFunc</option>
            </Select>
            {(layer === 'Affine') && (
              <Affine></Affine>
            )}
            {(layer === 'CNN') && (
              <CNN></CNN>
            )}
            {(layer === 'Pooling') && (
              <Pooling></Pooling>
            )}
            {(layer === 'LossFunc') && (
              <LossFunc></LossFunc>
            )}
          </Dialog>
        </div>
      )}
    </div>

  )
}

export default AddLayer