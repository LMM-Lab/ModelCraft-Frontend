'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import { ChangeEvent, useState } from "react";
import Affine from "./LayerDialog/Affine";
import CNN from "./LayerDialog/CNN";
import Pooling from "./LayerDialog/Pooling";
import LossFunc from "./LayerDialog/LossFunc";
import Select from "@/component/common/Select";
import { paramsProps } from "../types"; 

type AddLayerProps = {
  addParams:(param: paramsProps) => void
}

const AddLayer = ({addParams}:AddLayerProps) => {
  const [isOpend, setIsOpend] = useState(false)
  const [layer, setLayer] = useState<string>('')

  const toggleOpen = () => {
    setIsOpend((isOpend) => !isOpend)
    setLayer('Affine')
  }
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLayer(event.target.value)
  }
  return (
    <div>
      <Button $border={`1px solid#ffffff`} $paddingRight="1rem" $backColor="transparent" $color="black" $height="3rem" onClick={toggleOpen}>+ Add Layer</Button>
      {isOpend && (
        <div>
          <Dialog width="40rem" onClick={toggleOpen}>
            <Select $variants="param" $width="11rem" $marginTop="1rem" defaultValue={'Affine'} onChange={handleSelect}>
              <option value="Affine">Affine</option>
              <option value="CNN">CNN</option>
              <option value="Pooling">Pooling</option>
              <option value="LossFunc">LossFunc</option>
            </Select>
            {(layer === 'Affine') && (
              <Affine addParams={addParams} onClick={toggleOpen}></Affine>
            )}
            {(layer === 'CNN') && (
              <CNN addParams={addParams} onClick={toggleOpen}></CNN>
            )}
            {(layer === 'Pooling') && (
              <Pooling addParams={addParams} onClick={toggleOpen}></Pooling>
            )}
            {(layer === 'LossFunc') && (
              <LossFunc addParams={addParams} onClick={toggleOpen}></LossFunc>
            )}
          </Dialog>
        </div>
      )}
    </div>

  )
}

export default AddLayer