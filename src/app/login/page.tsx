'use client'
import Text from "@/component/common/Text";
import styled from "styled-components";
import Input from "@/component/common/Input";
import Flex from "@/component/common/styles/Flex";
import Button from "@/component/common/Button";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {

  type FormData = {
    mail: string
    password: string
  }
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit:SubmitHandler<FormData>=(data)=>{
    console.log(data)
  }

  return (
    <div>
      <Text $variants="ExtraLarge" margin="5rem 0 0 10rem">Login</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Flex $flex_direction="column" $marginTop="10rem" $justify_content="center" $align_items="center">
          <Input {...register('mail',{required:'please enter your e-mail'})} $textAlign="center" variants="default" placeholder="e-mail" />
          {errors.mail && <Text color="red" $variants="Medium">{errors.mail.message}</Text>}
          <Input {...register('password',{required:'please enter your password'})} $textAlign="center" $marginTop="1.5rem" variants="default" placeholder="password" />
          {errors.password && <Text color="red" $variants="Medium">{errors.password.message}</Text>}
          <Button $marginTop="10rem" $variants="Medium">login</Button>
        </Flex>
      </form>
    </div>
  )

}

export default Login