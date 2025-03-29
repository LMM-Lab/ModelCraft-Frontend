"use client";
import Text from "@/component/common/Text";
import styled from "styled-components";
import Input from "@/component/common/Input";
import Flex from "@/component/common/styles/Flex";
import Button from "@/component/common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import InputImage from "@/component/common/InputImage";
import { useState } from "react";
import UserNameInput from "@/component/common/UserNameInput";

type FormData = {
  name: string
  email: string
  password: string
}

const Register = () => {
  const [icon, setIcon] = useState<File>()
  const [userName, setUserName] = useState<string>('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        username: userName,
        email: data.email,
        password: data.password,
      }

      const res = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        console.error('❌ 登録失敗:', error)
      } else {
        const result = await res.json()
        console.log('✅ 登録成功:', result)
      }

    } catch (err) {
      console.error('❌ ネットワークエラー:', err)
    }
  }

  const handleIcon = (iconFile: File) => {
    setIcon(iconFile)
    console.log(iconFile)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
    console.log('userName:', userName)
  }

  return (
    <div>
      <Text $variants="ExtraLarge" $margin="5rem 0 0 10rem">Register</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex $flex_direction="column" $marginTop="5rem" $justify_content="center" $align_items="center">
          <Flex>
            <InputImage size={70} onFile={handleIcon} />
            <UserNameInput width="150px" onChange={handleInput}>{userName}</UserNameInput>
          </Flex>
          <Input
            {...register('email', { required: 'Enter your email' })}
            $marginTop="5rem" $variants="default" placeholder="e-mail" $textAlign="center" />
          {errors.email && <Text $color="red" $variants="Medium">{errors.email.message}</Text>}
          <Input
            {...register('password', { required: 'Enter your Password' })}
            $marginTop="1.5rem" $variants="default" placeholder="Password" $textAlign="center" />
          {errors.password && <Text $color="red" $variants="Medium">{errors.password.message}</Text>}
          <Button type="submit" $marginTop="5rem" $variants="Medium">login</Button>
        </Flex>
      </form>
    </div>
  )

}

export default Register