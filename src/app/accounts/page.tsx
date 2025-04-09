'use client'
import Flex from "@/component/common/styles/Flex";
import React from "react";
import { redirect } from 'next/navigation';

const Accounts = () => {
  redirect('/accounts/EditProfile');
  return (
    <Flex>
    </Flex>
  )
}

export default Accounts