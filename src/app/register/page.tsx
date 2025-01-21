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
  const [userName,setUserName]=useState<string>('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  const handleIcon = (iconFile: File) => {
    setIcon(iconFile)
    console.log(iconFile)
  }

  const handleInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setUserName(event.target.value)
    console.log('userName:',userName)
  }

  return (
    <div>
      <Text variants="ExtraLarge" margin="5rem 0 0 10rem">Register</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex $flex_direction="column" $marginTop="5rem" $justify_content="center" $align_items="center">
          <InputImage size={70} onFile={handleIcon}/>
          <Input
            {...register('name', { required: 'Enter your UserName' })}
            $marginTop="1.5rem" variants="default" placeholder="UserName" $textAlign="center" />
          {errors.name && <Text color="red" variants="Medium">{errors.name.message}</Text>}
          <Input
            {...register('email', { required: 'Enter your email' })}
            $marginTop="1.5rem" variants="default" placeholder="e-mail" $textAlign="center" />
          {errors.email && <Text color="red" variants="Medium">{errors.email.message}</Text>}
          <Input
            {...register('password', { required: 'Enter your Password' })}
            $marginTop="1.5rem" variants="default" placeholder="Password" $textAlign="center" />
          {errors.password && <Text color="red" variants="Medium">{errors.password.message}</Text>}
          <Button type="submit" $marginTop="5rem" variants="Medium">login</Button>
        </Flex>
      </form>
      <UserNameInput onChange={handleInput}>{userName}</UserNameInput>
    </div>
  )

}

export default Register