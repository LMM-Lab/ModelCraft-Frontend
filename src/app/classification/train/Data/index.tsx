import Flex from "@/component/common/styles/Flex";
import ImageUploader from "./ImageUploader"
import LabelUploader from "./LabelUploader";
import theme from "@/styles/theme";
import Text from "@/component/common/Text";
import { DataType } from "../page";

type DataProps = {
  setData:React.Dispatch<React.SetStateAction<DataType|null>>;
}

const Data = ({ setData }: DataProps) => {
  return (
    <Flex $width="90%" $height="auto" $marginTop="6rem" $flex_direction="column" $backgroundColor={`${theme.colors.white}`} $borderRadius="15px">
      <Text $variants="Medium" $margin="2rem 0 0 3rem">Data</Text>
      <Flex $margin="3rem auto" $width="80%" $justify_content="space-between">
        <ImageUploader setData={setData}></ImageUploader>
        <LabelUploader setData={setData}></LabelUploader>
      </Flex>
    </Flex>
  )
}

export default Data