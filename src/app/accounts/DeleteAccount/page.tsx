'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { useUser } from "@/Context/User";
import { useState } from "react";
// import { useRouter } from "next/router";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const DeleteAccount = () => {
  // const router = useRouter();
  const [res, setRes] = useState<string|boolean|undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setUser, user } = useUser()

  const handleTrash = () => {
    setIsOpen(true)
  }

  const handleBack=()=>{
    setRes(false)
    setIsOpen(false)
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/deleteUsers`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (response.ok) {
        setRes('アカウントが削除されました')
        setUser(undefined)
      } else {
        const errorData = await response.json();
        setRes('アカウントの削除に失敗しました')
      }
    } catch (err) {
      setRes('アカウント削除中に予期せぬエラーが発生しました');
    } finally {
    }
  };

  return (
    <Flex $margin="2rem 0 0 3rem" $flex_direction="column" $width="40%" $height="fit-content">
      <Button onClick={handleTrash} $width="100%" $height="6rem" $marginTop="12rem" $fontSize="3rem" $backColor="transparent" $color="#e20000">delete account</Button>
      {isOpen && <Dialog onClick={() => setIsOpen(false)}>
        <Text>本当に削除しますか？</Text>
        <Button onClick={handleDeleteAccount} $margin="2rem auto 0 auto" $width="30%" $height="4rem">Delete</Button>
      </Dialog>}
      {res&&
      <Dialog onClick={() => handleBack()}>
        <Text>{res}</Text>
      </Dialog>}
    </Flex>
  )

}

export default DeleteAccount