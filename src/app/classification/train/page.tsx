'use client'
import Model from "./Model";
import React, { useEffect, useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";
import { ModelConfigContext, ModelConfigType } from "@/Context/ModelConfig";
import Output from "./Output";
import Nav from "./Nav";
import Data from "./Data";

export type DataType={
  train?:File[]
  label?:string[]
  inputSize?:number[]
}

const Train = () => {
  const [modelConfig, setModelConfig] = useState<ModelConfigType>()
  const [data,setData]=useState<DataType|null>(null)
  return (
    <ModelConfigContext.Provider value={{ modelConfig, setModelConfig }}>
      <Flex $flex_direction="column" $align_items="center">
        <Nav nav="train"></Nav>
        <Data setData={setData}></Data>
        <Model inputSize={data?.inputSize ?? []}></Model>
        <Flex $justify_content="space-between" $marginTop="3rem">
          <Progress></Progress>
        </Flex>
        <Output></Output>
      </Flex>
    </ModelConfigContext.Provider>
  )
}

export default Train