'use client'
import Model from "./Model";
import React, {  useMemo, useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";
import { ModelConfigContext, ModelConfigType } from "@/Context/ModelConfig";
import Output from "./Output";
import Nav from "./Nav";
import Data from "./Data";
import { paramsProps } from "./Model/types";

export type DataType={
  train?:File[]
  label?:string[]
  inputSize?:number[]
}

const Train = () => {
  const [modelConfig, setModelConfig] = useState<ModelConfigType>()
  const [data,setData]=useState<DataType|null>(null)
  const [params, setParams] = useState<paramsProps[]>([]);

  const stableInputSize=useMemo(()=>{
    return data?.inputSize ?? []
  },[data?.inputSize])

  return (
    <ModelConfigContext.Provider value={{ modelConfig, setModelConfig }}>
      <Flex $flex_direction="column" $align_items="center">
        <Nav nav="train"></Nav>
        <Data setData={setData}></Data>
        <Model inputSize={stableInputSize} setParams={setParams} params={params}></Model>
        <Flex $justify_content="space-between" $marginTop="3rem">
          <Progress></Progress>
        </Flex>
        <Output></Output>
      </Flex>
    </ModelConfigContext.Provider>
  )
}

export default Train