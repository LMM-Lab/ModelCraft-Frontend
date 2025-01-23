import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import DnD from "@/app/classification/train/Model/DnD";
import styled from "styled-components";
// import AddLayer from "./AddLayer";
// import ModelSetting from "./Model/ModelSetting";
import Model from "./Model";


const Train = () => {

  return (
    <div>
      <Text variants="ExtraLarge">Train</Text>
      <Model></Model>
    </div>
  )
}

export default Train