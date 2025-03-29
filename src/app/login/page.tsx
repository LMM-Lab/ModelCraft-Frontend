'use client'
import Text from "@/component/common/Text";
import styled from "styled-components";
import Input from "@/component/common/Input";
import Flex from "@/component/common/styles/Flex";
import Button from "@/component/common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/Context/User";

const Login = () => {
  const {setUser,user}=useUser()

  type FormData = {
    username: string
    password: string
  }
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit:SubmitHandler<FormData>= async(data)=>{
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.toString();

    try {
      const loginResponse = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData.toString(),
      });
  
      const loginResult = await loginResponse.json();
      console.log("loginResult:", loginResult);
      if (!loginResponse.ok) {
        console.error("ログイン失敗:", loginResult.detail || loginResult);
        return;
      }
  
      const userResponse = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log("ログインユーザー:", userData);
        setUser({'username':userData.username})
      } else {
        console.error("ユーザー情報取得失敗");
      }
    } catch (error) {
      console.error("通信エラー:", error);
    }
  }

  return (
    <div>
      <Text $variants="ExtraLarge" $margin="5rem 0 0 10rem">Login</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Flex $flex_direction="column" $marginTop="10rem" $justify_content="center" $align_items="center">
          <Input {...register('username',{required:'please enter your e-mail'})} $textAlign="center" $variants="default" placeholder="e-username" />
          {errors.username && <Text $color="red" $variants="Medium">{errors.username.message}</Text>}
          <Input {...register('password',{required:'please enter your password'})} $textAlign="center" $marginTop="1.5rem" $variants="default" placeholder="password" />
          {errors.password && <Text $color="red" $variants="Medium">{errors.password.message}</Text>}
          <Button $marginTop="10rem" $variants="Medium">login</Button>
        </Flex>
      </form>
    </div>
  )

}

export default Login