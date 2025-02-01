'use client'
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/app/classification/train/Model/DnD";
import AddLayer from "./AddLayer";
import ModelSetting from "./ModelSetting";
import {  useEffect, useState } from "react";
import { LayerIOCalculator } from "./DnD/IOCalculator";
import { paramsProps } from "./types";
import Dialog from "@/component/common/Dialog";
import theme from "@/styles/theme";

type ModelProps={
  inputSize:number[]
}

const Model = ({inputSize,}:ModelProps) => {
  const [error,setError]=useState<string|null>(null)
  const [params, setParams] = useState<paramsProps[]>([]);

  const handleParamsUpdate=(params:paramsProps[],prev:paramsProps[])=>{
    try {
      const recalculated = LayerIOCalculator(params, inputSize);
      return recalculated;
    } catch (error:any) {
      setError(error.message)
      return prev;
    }
  }

  const addParams=(param:paramsProps)=>{
    setParams((prev) => {
      const newParams = [...prev, param];
      return handleParamsUpdate(newParams,prev)
    });
  }

  useEffect(()=>{
    setParams(LayerIOCalculator(params,inputSize))
  },[inputSize])

  return (
    <Flex $width="95%" $minHeight="22.5rem" $flex_direction="column" $backgroundColor={`${theme.colors.white}`} $borderRadius="15px" $margin="3rem auto 0 auto">
      <Flex $justify_content="space-between" $align_items="center" $width="95%" $height="fit-content" $margin="2rem auto 0 auto">
        <Text $variants="Medium">Model</Text>
        <Flex $flex_direction="column" $justify_content="flex-start" $align_items="flex-start">
          <AddLayer addParams={addParams}></AddLayer>
          <ModelSetting></ModelSetting>
        </Flex>
      </Flex>
      <DnD params={params} setParams={setParams} handleParamsUpdate={handleParamsUpdate}></DnD>
      {error && 
      <Dialog onClick={()=>{setError(null)}}>
        <Text $marginBottom="1rem">Error Info</Text>
        <Text $variants="Small" $color="red">{error}</Text>
      </Dialog>}
    </Flex>
  )
}

export default Model