'use client'
import Model from "./Model";
import React, { createContext, useContext, useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";
import { paramsProps } from "./Model/types";

type GlobalStateType = {
  state: number[];
  setState: React.Dispatch<React.SetStateAction<number[]>>;
};

const GlobalStateContext = createContext<GlobalStateType | undefined>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

const Train = () => {
  const [params,setParams]=useState<paramsProps[]>([]);
  const [state, setState] = useState<number[]>([108]);
  const [inputSize,setInputSize]=useState<number[]>([10])
  return (
    <Flex $flex_direction="column" $align_items="center">
      <GlobalStateContext.Provider value={{ state, setState }}>
        <Model inputSize={inputSize} params={params} setParams={setParams}></Model>
      </GlobalStateContext.Provider>
      <Flex $justify_content="space-between" $marginTop="6rem">
        <Progress></Progress>
      </Flex>
    </Flex>
  )
}

export default Train