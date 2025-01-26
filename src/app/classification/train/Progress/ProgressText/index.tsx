import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import { log } from ".."

const ProgressText=({logs}:{logs:log[]})=>{
  return(
    <Flex $flex_direction="column">
      {logs.map((log,index)=>(
        <Text $marginTop="0.6rem" $variants="Small" key={index}>{`[Epoch:${log.epoch}] [train-loss:${log.trainLoss}] [val-loss:${log.valLoss}] [time:${log.time}]`}</Text>
      ))}
    </Flex>
  )
}

export default ProgressText