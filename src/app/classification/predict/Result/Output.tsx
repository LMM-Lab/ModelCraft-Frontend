'use client'
import Text from "@/component/common/Text";
import Flex from "@/component/common/styles/Flex";

const Output=({label}:{label?:number})=>{
  return (
    <Flex $width="35rem" $height="5rem" $backgroundColor="white" $borderRadius="15px" $justify_content="space-around" $align_items="center">
      <Text>output</Text>
      <Text>{label}</Text>
    </Flex>
  )

}

export default Output