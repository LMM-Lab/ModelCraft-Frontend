'use client'
import Text from "@/component/common/Text";
import Model from "./Model";
import React, { createContext, useContext, useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";

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
  const [state, setState] = useState<number[]>([10]);
  return (
    <Flex $flex_direction="column" $align_items="center">
      <GlobalStateContext.Provider value={{ state, setState }}>
        <Model></Model>
      </GlobalStateContext.Provider>
      <Progress></Progress>
    </Flex>
  )
}

export default Train