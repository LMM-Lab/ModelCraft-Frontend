import Box from "@/component/common/styles/Box"
import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import Link from "next/link"

const Nav = ({ nav }: { nav: 'train' | 'predict' }) => {
  return (
    <Flex $width="56rem" $justify_content="space-around" $marginTop="6rem">
      <Link href='/classification/train'>
        <Flex $flex_direction="column" $align_items="center">
          <Text $variants="Medium">Train</Text>
          {nav === 'train' && <Box $marginTop="0.4rem" $borderButton="1px solid#333" $width="12rem"></Box>}
        </Flex>
      </Link>
      <Link href='/classification/predict'>
        <Flex $flex_direction="column" $align_items="center">
          <Text $variants="Medium">Predict</Text>
          {nav === 'predict' && <Box $marginTop="0.4rem" $borderButton="1px solid#333" $width="12rem"></Box>}
        </Flex>
      </Link>
    </Flex>
  )
}

export default Nav