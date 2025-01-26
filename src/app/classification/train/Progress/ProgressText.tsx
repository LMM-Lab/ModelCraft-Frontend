import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import { log } from "."

const ProgressText=({logs}:{logs:log[]})=>{
  return(
    <Flex $flex_direction="column" $margin="1rem 0 3rem 3rem">
      {logs.map((log,index)=>(
        <Text $marginTop="0.6rem" $variants="Small" key={index}>{`[Epoch:${log.epoch}] [train-loss:${log.trainLoss}] [val-loss:${log.valLoss}] [time:${log.time}]`}</Text>
      ))}
    </Flex>
  )
}

export default ProgressText