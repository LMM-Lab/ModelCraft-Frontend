import Text from "@/component/common/Text";
import Layer from "@/component/crassificationTrain/Layer";
import styled from "styled-components";


const Train=()=>{
  return (
    <div>
      <Text variants="ExtraLarge">Train</Text>
      <Layer name="Affine" input="120×120×3" output="245×120×3"></Layer>
    </div>
  )

}

export default Train