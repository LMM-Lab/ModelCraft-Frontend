'use client'
import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import ProgressBar from "./ProgressBar"
import ProgressText from "./ProgressText"
import { useState } from "react"

export type log={
  epoch:number
  trainLoss:number
  valLoss:number 
  time:number 
}

const Progress=()=>{
  const [logs,setLogs]=useState<log[]>([{epoch:1,trainLoss:4,valLoss:9,time:3},{epoch:2,trainLoss:4,valLoss:9,time:3},{epoch:3,trainLoss:4,valLoss:9,time:3}])
  return(
    <Flex $flex_direction="column" $width="60%" $borderRadius="15px" $backgroundColor="white">
      <Text $variants="Medium">Progress</Text>
      <ProgressBar logs={logs}></ProgressBar>
      <ProgressText logs={logs}></ProgressText>
    </Flex>
  )
}

export default Progress