'use client'
import Model from "./Model";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";
import { paramsProps } from "./Model/types";
import { ModelConfigContext, ModelConfigType } from "@/Context/ModelConfig";


const Train = () => {
  const [params, setParams] = useState<paramsProps[]>([]);
  const [modelConfig, setModelConfig] = useState<ModelConfigType>()
  const [inputSize, setInputSize] = useState<number[]>([10])

  useEffect(()=>{
    console.log('modelConfig:',modelConfig)
  },[modelConfig])
  return (
    <ModelConfigContext.Provider value={{ modelConfig, setModelConfig }}>
      <Flex $flex_direction="column" $align_items="center">
        <Model inputSize={inputSize} params={params} setParams={setParams}></Model>
        <Flex $justify_content="space-between" $marginTop="6rem">
          <Progress></Progress>
        </Flex>
      </Flex>
    </ModelConfigContext.Provider>
  )
}

export default Train