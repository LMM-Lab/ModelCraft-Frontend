'use client'
import Model from "./Model";
import React, { useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";
import { ModelConfigContext, ModelConfigType } from "@/Context/ModelConfig";
import Output from "./Output";

const Train = () => {
  const [modelConfig, setModelConfig] = useState<ModelConfigType>()
  const [inputSize, setInputSize] = useState<number[]>([10])
  return (
    <ModelConfigContext.Provider value={{ modelConfig, setModelConfig }}>
      <Flex $flex_direction="column" $align_items="center">
        <Model inputSize={inputSize}></Model>
        <Flex $justify_content="space-between" $marginTop="6rem">
          <Progress></Progress>
        </Flex>
        <Output></Output>
      </Flex>
    </ModelConfigContext.Provider>
  )
}

export default Train