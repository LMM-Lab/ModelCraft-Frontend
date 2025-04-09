'use client'
import styled from "styled-components";
import React, { useState } from "react";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import Button from "@/component/common/Button";


const DeleteAccount = () => {

  return (
    <Flex $margin="2rem 0 0 3rem" $flex_direction="column" $width="40%" $height="fit-content">
      {/* <Text $variants="Large">Delete account</Text> */}
      <Button $width="100%" $height="6rem" $marginTop="12rem" $fontSize="3rem" $backColor="transparent" $color="#e20000">Delete account</Button>
    </Flex>
  )

}

export default DeleteAccount