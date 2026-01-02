'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ModelItem from "./ModelItem";

type Model = {
  model_id: number;
  model_name: string;
  size: number | null;
  timestamp: string;
  user_id: number;
}

const ModelList = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([])
  const [modelName, setModelName] = useState<string>('')

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch(`${baseUrl}/model/model_list`, {
          credentials: "include",
        })
        if (!res.ok) {
          const errorData = await res.json();
          console.log("APIエラー:", errorData.detail);
          return;
        }
        const data = await res.json()
        console.log('model一覧', data)
        setModels(data || [])
      } catch (err) {
        console.error("モデルの取得に失敗しました", err)
      }
    }
    fetchModels()
  }, [])

  const handleTrash=(modelName:string)=>{
    setIsOpen(true)
    setModelName(modelName)
  }


  const trashModel=async()=>{
    try {
      const res = await fetch(`${baseUrl}/model/model_delete`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model_name: modelName }),
      })
      if (!res.ok) {
        const errorData = await res.json()
        console.log('APIエラー:', errorData.detail)
        return
      }
      const data = await res.json()
      console.log('削除成功', data)
    } catch (err) {
      console.error('モデルの削除に失敗しました', err)
    }
    setIsOpen(false)
    setModels((prev) => prev.filter((m) => m.model_name !== modelName));
  }


  return (
    <Flex $margin="2rem 0 0 3rem" $flex_direction="column" $width="50%" $height="80%" $overflowY="scroll">
      <Text $variants="Large" $marginBottom="3rem">Model list</Text>
      {models.map((item, index) => (
          <ModelItem key={index} modelName={item.model_name} size={item.size} timestamp={item.timestamp}>
            <FontAwesomeIcon onClick={() => { handleTrash(item.model_name) }} icon={faTrash} style={{ fontSize: '1.5rem' }}></FontAwesomeIcon>
          </ModelItem>
      ))}
      {isOpen &&
        <Dialog onClick={() => setIsOpen(false)}>
          <Text>本当に削除しますか？</Text>
          <Button onClick={trashModel} $margin="2rem auto 0 auto" $width="30%" $height="4rem">Delete</Button>
        </Dialog>}
    </Flex>
  )

}

export default ModelList