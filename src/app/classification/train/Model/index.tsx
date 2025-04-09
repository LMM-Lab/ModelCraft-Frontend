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
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
  params:paramsProps[]
}

const Model = ({inputSize,setParams,params}:ModelProps) => {
  const [error,setError]=useState<string|null>(null)

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
    const newParams = [...params, param];
    const updatedParams=handleParamsUpdate(newParams,params)
    setParams(updatedParams);
  }

  useEffect(()=>{
    setParams(LayerIOCalculator(params,inputSize))
  },[inputSize])

  return (
    <Flex $width="90%" $minHeight="22.5rem" $flex_direction="column" $backgroundColor={`${theme.colors.white}`} $borderRadius="15px" $margin="3rem auto 0 auto">
      <Flex $justify_content="space-between" $align_items="center" $width="95%" $height="fit-content" $margin="2rem auto 0 auto">
        <Text $variants="Medium">Model</Text>
        <Flex $flex_direction="column" $justify_content="flex-start" $align_items="flex-start">
          <AddLayer addParams={addParams}></AddLayer>
          <ModelSetting></ModelSetting>
        </Flex>
      </Flex>
      <DnD setError={setError} inputSize={inputSize} params={params} setParams={setParams} handleParamsUpdate={handleParamsUpdate}></DnD>
      {error && 
      <Dialog onClick={()=>{setError(null)}}>
        <Text $marginBottom="1rem">Error Info</Text>
        <Text $variants="Small" $color="red">{error}</Text>
      </Dialog>}
    </Flex>
  )
}

export default Model