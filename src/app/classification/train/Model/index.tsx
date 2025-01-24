'use client'
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/app/classification/train/Model/DnD";
import styled from "styled-components";
import AddLayer from "./AddLayer";
import ModelSetting from "./ModelSetting";
import { useEffect, useState } from "react";
import { IOCaculator } from "./DnD/IOCalculator";


type AffineParams = {
  model: string
  id: number
  inputSize: number
  outputSize: number
  actFunc?: string
  weightInit: string
}

type CNNParams = {
  model: string
  id: number
  filters: number
  kernel: number
  stride: number
  padding: number
  actFunc: string
  weightInit: string
}

type PoolingParams = {
  model: string
  id: number
  kernel: number
  stride: number
  padding:number
}

type LossFuncParams = {
  model: string
  id: number
  lossFunc: string
}

export type paramsProps=AffineParams|CNNParams|PoolingParams|LossFuncParams

const Model = () => {

  const [params,setParams]=useState<paramsProps[]>([])

  const addParams=(param:paramsProps)=>{
    setParams((prev)=>[...prev,param])
  }

  useEffect(()=>{
    // console.log(params)
  },[params])

  console.log('IOCaculator',IOCaculator([28],{model:'Affine',inputSize:28,outputSize:2}))

  return (
    <Flex $width="95%" $minHeight="360px" $flex_direction="column" $backgroundColor="White" $borderRadius="15px" $margin="0 auto">
      <Flex $justify_content="space-between" $align_items="center" $width="95%" $height="fit-content" $margin="2rem auto 0 auto">
        <Text $variants="Medium">Model</Text>
        <Flex $flex_direction="column" $justify_content="flex-start" $align_items="flex-start">
          <AddLayer onSubmit={addParams}></AddLayer>
          <ModelSetting></ModelSetting>
        </Flex>
      </Flex>
      <DnD params={params} setParams={setParams}></DnD>
    </Flex>
  )
}

export default Model