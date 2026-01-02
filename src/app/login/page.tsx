'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import Input from "@/component/common/Input";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { useUser } from "@/Context/User";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter()
  const { setUser, user } = useUser()
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  type FormData = {
    username: string
    password: string
  }
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.toString();

    try {
      const loginResponse = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData.toString(),
      });
      if (!loginResponse.ok) {
        if (loginResponse.status === 401) {
          return setError('ユーザー名またはパスワードが間違っています')
        } else {
          return setError('ログインに失敗しました。もう一度お試しください')
        }
      } else {
        router.push('/classification/train')
      }
    } catch (error) {
      console.log("ログインエラー:", error);
    }

    const userResponse = await fetch("http://localhost:8000/auth/me", {
      method: "GET",
      credentials: "include",
    });
    if (userResponse.ok) {
      const userData = await userResponse.json();
      setUser({ 'username': userData.username ,'icon':userData.icon})
    } else {
      console.log("ユーザー情報取得失敗");
    }
  }

  return (
    <div>
      <Text $variants="ExtraLarge" $margin="5rem 0 0 10rem">Login</Text>
      {error &&
        <Dialog onClick={() => { setError(null) }}>
          <Text $marginBottom="1rem">Error Info</Text>
          <Text $variants="Small" $color="red">{error}</Text>
        </Dialog>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex $flex_direction="column" $marginTop="10rem" $justify_content="center" $align_items="center">
          <Input {...register('username', { required: 'please enter your e-mail' })} $textAlign="center" $variants="default" placeholder="e-username" />
          {errors.username && <Text $color="red" $variants="Medium">{errors.username.message}</Text>}
          <Input {...register('password', { required: 'please enter your password' })} type="password" $textAlign="center" $marginTop="1.5rem" $variants="default" placeholder="password" />
          {errors.password && <Text $color="red" $variants="Medium">{errors.password.message}</Text>}
          <Button $marginTop="10rem" $variants="Medium">login</Button>
        </Flex>
      </form>
    </div>
  )

}

export default Login