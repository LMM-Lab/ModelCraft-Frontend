import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import Chart from "./Graph";

export type resultType = {
  type: string
  epoch: number[]
  train: number[]
  val: number[]
}
const Loss: resultType = {
  type: 'Loss',
  epoch: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  train: [0.464, 0.644, 0.763, 0.978, 0.518, 0.889, 0.690, 0.920, 0.665, 0.413, 0.609, 0.656, 0.679, 0.640, 0.617, 0.372, 0.483, 0.992, 0.427, 1.607],
  val: [0.277, 0.212, 0.872, 0.959, 0.576, 0.740, 0.730, 1.182, 0.221, 0.296, 0.743, 0.228, 0.903, 0.824, 1.074, 0.576, 0.857, 0.679, 0.284, 1.186]
}
const Acc: resultType = {
  type: 'Acc',
  epoch: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  train: [0.706, 0.879, 0.858, 0.856, 0.712, 0.881, 0.760, 0.782, 0.980, 0.875, 0.800, 0.847, 0.856, 0.905, 0.724, 0.743, 0.844, 0.717, 0.911, 0.895],
  val: [0.607, 0.614, 0.949, 0.868, 0.790, 0.981, 0.854, 0.888, 0.841, 0.608, 0.642, 0.839, 0.708, 0.915, 0.842, 0.888, 0.655, 0.721, 0.999, 0.795]
}

const Output = () => {
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