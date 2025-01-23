import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/component/crassificationTrain/DnD";
import styled from "styled-components";
import AddLayer from "./AddLayer";


const Train=()=>{

  return (
    <div>
      <Text variants="ExtraLarge">Train</Text>
      <Flex $width="1000px" $height="360px" $backgroundColor="White" $borderRadius="15px" $margin="0 auto">
        <Text variants="Medium">Model</Text>
        <Flex $flex_direction="column" $justify_content="flex-start" $align_items="flex-start">
          <AddLayer></AddLayer>
          <Button backcolor="transparent" color="black" height="2rem">+ Model Setting</Button>
        </Flex>
      </Flex>
      <DnD></DnD>
    </div>
  )
}

export default Train