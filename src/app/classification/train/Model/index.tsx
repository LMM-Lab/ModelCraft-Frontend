import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/app/classification/train/Model/DnD";
import styled from "styled-components";
import AddLayer from "./AddLayer";
import ModelSetting from "./ModelSetting";

const Model = () => {
  return (
    <Flex $width="95%" $minHeight="360px" $flex_direction="column" $align_items="center" $backgroundColor="White" $borderRadius="15px" $margin="0 auto">
      <Flex $justify_content="space-between" $align_items="center" $width="95%" $height="fit-content" $marginTop="2rem">
        <Text variants="Medium">Model</Text>
        <Flex $flex_direction="column" $justify_content="flex-start" $align_items="flex-start">
          <AddLayer></AddLayer>
          <ModelSetting></ModelSetting>
        </Flex>
      </Flex>
      <DnD></DnD>
    </Flex>
  )
}

export default Model