import Button from "@/component/common/Button";
import Text from "@/component/common/Text";
import Dialog from "@/component/crassificationTrain/Dialog";
import DnD from "@/component/crassificationTrain/DnD";
import styled from "styled-components";


const Train=()=>{
  return (
    <div>
      <Text variants="ExtraLarge">Train</Text>
      <DnD></DnD>
      <Dialog></Dialog>
    </div>
  )
}

export default Train