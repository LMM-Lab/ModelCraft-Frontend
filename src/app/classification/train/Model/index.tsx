'use client'
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/app/classification/train/Model/DnD";
import AddLayer from "./AddLayer";
import ModelSetting from "./ModelSetting";
import { useEffect, useState } from "react";
import { LayerIOCalculator } from "./DnD/IOCalculator";
import { TypeIO,paramsProps } from "./types";

const Model = () => {

  const [params,setParams]=useState<paramsProps[]>([]);
  const [layerIO, setLayerIO] = useState<TypeIO[]>([]);

  const addParams=(param:paramsProps)=>{
    setParams((prev)=>[...prev,param])
  }

  useEffect(()=>{
    const IO=LayerIOCalculator(params,[28])
    setLayerIO(IO)
    console.log('IO',IO)
  },[params])

  return (
    <Flex $width="95%" $minHeight="360px" $flex_direction="column" $backgroundColor="White" $borderRadius="15px" $margin="0 auto">
      <Flex $justify_content="space-between" $align_items="center" $width="95%" $height="fit-content" $margin="2rem auto 0 auto">
        <Text $variants="Medium">Model</Text>
        <Flex $flex_direction="column" $justify_content="flex-start" $align_items="flex-start">
          <AddLayer onSubmit={addParams}></AddLayer>
          <ModelSetting></ModelSetting>
        </Flex>
      </Flex>
      <DnD layerIO={layerIO} setLayerIO={setLayerIO} setParams={setParams}></DnD>
    </Flex>
  )
}

export default Model