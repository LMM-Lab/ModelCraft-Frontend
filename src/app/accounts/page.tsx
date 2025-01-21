'use client'
import Text from "@/component/common/Text";
import styled from "styled-components";
import UserNameInput from "@/component/common/UserNameInput";
import InputImage from "@/component/common/InputImage";
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import React, { useState } from "react";

const Accounts = () => {
  const [icon, setIcon] = useState<File>()
  const [userName, setUserName] = useState<string>('')

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event?.target.value)
  }

  const handleIcon = (iconFile: File) => {
    setIcon(iconFile)
  }
  return (
    <div>
      <Text variants="ExtraLarge" margin="5rem 0 0 10rem">Accounts</Text>
      <Flex $marginTop="15rem" $flex_direction="column" $justify_content="center" $align_items="center">
        <Flex>
          <InputImage onFile={handleIcon}></InputImage>
          <UserNameInput onChange={handleUserName}>{userName}</UserNameInput>
        </Flex>
        <Button $marginTop="5rem" variants="Medium">logout</Button>
        <Button $marginTop="18rem" backcolor="transparent" color="#000000" fontSize="1.5rem">delete account</Button>
      </Flex>
    </div>
  )

}

export default Accounts