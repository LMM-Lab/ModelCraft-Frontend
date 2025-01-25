'use client'
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/app/classification/train/Model/DnD";
import styled from "styled-components";
import Model from "./Model";
import React, { createContext, useContext, useState, ReactNode } from "react";

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
    <div>
      <GlobalStateContext.Provider value={{ state, setState }}>
        <Text $variants="ExtraLarge">Train</Text>
        <Model></Model>
      </GlobalStateContext.Provider>
    </div>
  )
}

export default Train