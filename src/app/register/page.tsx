"use client";
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import Input from "@/component/common/Input";
import InputImage from "@/component/common/InputImage";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import UserNameInput from "@/component/common/UserNameInput";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  name: string
  email: string
  password: string
}

const Register = () => {
  const [icon, setIcon] = useState<File>()
  const [userName, setUserName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('email', data.email);
      formData.append('password', data.password);
  
      if (icon) {
        formData.append('icon', icon);
      }
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        if(res.status===409){
          setError('ユーザー名またはメールアドレスが既に使用されています')
        } else {
          console.log(error.detail)
          setError('登録に失敗しました。もう一度お試しください')
        }
      } else {
        router.push('/login')
      }
  
    } catch (err) {
      console.log(err);
      setError('登録に失敗しました。もう一度お試しください')
    }
  };

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
      {error &&
          <Dialog onClick={() => { setError(null) }}>
            <Text $marginBottom="1rem">Error Info</Text>
            <Text $variants="Small" $color="red">{error}</Text>
          </Dialog>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex $flex_direction="column" $marginTop="5rem" $justify_content="center" $align_items="center">
          <Flex>
            <InputImage size={70} onFile={handleIcon} />
            <UserNameInput width="150px" onChange={handleInput}>{userName}</UserNameInput>
          </Flex>
          <Input
            {...register('email', { required: 'メールアドレスを入力してください' })}
            $marginTop="5rem" $variants="default" placeholder="e-mail" $textAlign="center" />
          {errors.email && <Text $color="red" $variants="Medium">{errors.email.message}</Text>}
          <Input
            {...register('password', { required: 'パスワードを入力してください' })}
            $marginTop="1.5rem" $variants="default" placeholder="Password" $textAlign="center" />
          {errors.password && <Text $color="red" $variants="Medium">{errors.password.message}</Text>}
          <Button type="submit" $marginTop="5rem" $variants="Medium">Register</Button>
        </Flex>
      </form>
    </div>
  )

}

export default Register