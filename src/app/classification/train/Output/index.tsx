import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import Chart from "./Graph";
import { useProgressData } from "@/Context/ProgressData";
import { useEffect, useState } from "react";

export type resultType = {
  type: string
  epoch: number[]
  train: number[]
  val: number[]
}


const Output = () => {
  const {progressData}=useProgressData()
  const [epoch,setEpoch]=useState<number[]>([])
  const [trainLoss,setTrainLoss]=useState<number[]>([])
  const [trainAcc,setTrainAcc]=useState<number[]>([])
  const [valLoss,setValLoss]=useState<number[]>([])
  const [valAcc,setValAcc]=useState<number[]>([])

  useEffect(() => {
    if (progressData?.epoch !== undefined) {
      setEpoch((prev) => [...prev, progressData.epoch]);
    }
    if (progressData?.loss_json?.train !== undefined) {
      setTrainLoss((prev) => [...prev, progressData.loss_json.train]);
    }
    if (progressData?.acc_json?.train !== undefined) {
      setTrainAcc((prev) => [...prev, progressData.acc_json.train]);
    }
    if (progressData?.loss_json?.val !== undefined) {
      setValLoss((prev) => [...prev, progressData.loss_json.val]);
    }
    if (progressData?.acc_json?.val !== undefined) {
      setValAcc((prev) => [...prev, progressData.acc_json.val]);
    }
  }, [progressData]);

  const Acc: resultType = {
    type: 'Acc',
    epoch:epoch,
    train: trainAcc,
    val:valAcc
  }

  const Loss: resultType = {
    type: 'Loss',
    epoch:epoch,
    train: trainLoss,
    val: valLoss,
  }

  return (
    <Flex $flex_direction="column" $width="95rem" $height="auto" $margin="3rem 0 3rem 0" $backgroundColor="white" $borderRadius="15px">
      <Text $variants="Medium" $margin="2rem 0 0 3rem">Output</Text>
      <Flex $width="100%" $margin="5rem auto" $justify_content="space-around">
        <Flex $flex_direction="column">
          <Text $variants="Medium" $marginBottom="1rem">Loss</Text>
          <Chart data={Loss}></Chart>
        </Flex>
        <Flex $flex_direction="column">
          <Text $variants="Medium">Acc</Text>
          <Chart data={Acc}></Chart>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Output