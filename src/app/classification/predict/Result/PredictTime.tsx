'use client'
import Text from "@/component/common/Text";
import Flex from "@/component/common/styles/Flex";

const PredictTime=({time}:{time?:number})=>{
  return (
    <Flex $marginTop="1rem" $width="35rem" $height="5rem" $backgroundColor="white" $borderRadius="15px" $justify_content="space-around" $align_items="center">
      <Text>predict time</Text>
      {time ? <Text>{time}sec</Text> : <Text>{time}</Text>}
    </Flex>
  )

}

export default PredictTime