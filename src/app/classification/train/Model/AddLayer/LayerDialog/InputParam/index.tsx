import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import React, { Children } from "react"

type InputParamProps = {
  children: React.ReactNode
  $marginTop?: string
  $marginRight?: string
  name:string
}

const InputParam = ({ children, $marginTop, $marginRight = '6rem',name }: InputParamProps) => {

  const childArray = React.Children.toArray(children)
  const children0 = childArray[0]
  const children1 = childArray[1]

  return (
    <Flex $marginTop={$marginTop} $marginRight={$marginRight} $flex_direction="column" $align_items="flex-end">
      <Flex $justify_content="flex-end" $align_items="center">
        <Text $variants="Medium">{name}</Text>
        {children0}
      </Flex>
      {children1}
    </Flex>
  )

}

export default InputParam