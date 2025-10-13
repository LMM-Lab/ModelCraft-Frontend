'use client'
import styled from "styled-components";
import React, { useState } from "react";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import Button from "@/component/common/Button";
import { redirect } from "next/navigation";
import { useUser } from "@/Context/User";


const Logout = () => {
  const { setUser, user } = useUser()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogout=async()=>{
    const res=await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      console.log('ログアウト失敗:', error);
    } else {
      console.log('ログアウト成功:');
      setUser(undefined)
      redirect('/classification/train');
    }
  }

  return (
    <Flex $margin="2rem 0 0 3rem" $flex_direction="column" $width="40%" $height="fit-content">
      <Button onClick={handleLogout} $width="100%" $height="6rem" $marginTop="12rem" $fontSize="3rem">Logout</Button>
    </Flex>
  )

}

export default Logout