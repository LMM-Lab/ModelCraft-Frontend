'use client'
import Button from "@/component/common/Button";
import ImageUploader from "./ImageUploader";
import { useEffect, useRef, useState } from "react";
import Result from "./Result";
import SelectModel from "./SelectModel";
import Flex from "@/component/common/styles/Flex";
import Nav from "../train/Nav";
import { useUser } from "@/Context/User";
import Dialog from "@/component/common/Dialog";
import Text from "@/component/common/Text";

export type PredictDataType = {
  image?: File[]
  modelName?: string
}

export type ResultType = {
  target_user?: string
  predicted_label?: number
  time?: number
}

const Predict = () => {
  const [data, setData] = useState<PredictDataType | null>(null)
  const [result, setResult] = useState<ResultType | null>(null)
  const { user } = useUser()
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

  useEffect(() => {
    let shouldReconnect = true

    const connect = () => {
      const ws = new WebSocket(`${wsUrl}/auth/ws?page=predict`)
      wsRef.current = ws
      ws.onopen = () => {
        console.log('WebSocket-predict 接続完了')
      }
      ws.onmessage = (e) => {
        try {
          const parsed = JSON.parse(e.data)
          if (('message' in parsed)) {
            return
          }
          setResult(parsed)
        } catch (err) {
          console.log('Progress WS Error:', err)
        }
      }
      ws.onclose = () => {
        console.log('WebSocket切断')
        if (shouldReconnect && user) {
          console.log('再接続を試みます...')
          reconnectTimerRef.current = setTimeout(connect, 3000)
        }
      }
      ws.onerror = (err) => {
        console.log("onerror", err)
        ws.close()
      }
    }
    connect()
    return () => {
      shouldReconnect = false
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current)
      }
      wsRef.current?.close()
    }
  }, [])

  const handleButton = async () => {

    if (!data || !data.image){
      setError('ラベルを選択してください')
    } else if (!data?.modelName){
      return setError('モデルを選択してください')
    } else {
      const formData = new FormData()
      formData.append('model_name', data?.modelName)
      formData.append('image', data?.image[0])
      console.log('data?.image[0]',data?.image[0])
  
      const res = await fetch(`${baseUrl}/predict`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })
    }
  }

  return (
    <Flex $flex_direction="column" $align_items="center">
      {error &&
        <Dialog onClick={() => { setError(null) }}>
          <Text $marginBottom="1rem">Error Info</Text>
          <Text $variants="Small" $color="red">{error}</Text>
        </Dialog>}
      <Nav nav="predict"></Nav>
      <Flex $marginTop="8rem" $align_items="center" $justify_content="space-between" $width="75rem">
        <ImageUploader setData={setData}></ImageUploader>
        <Result label={result?.predicted_label} time={result?.time}></Result>
      </Flex>
      <Flex $marginTop="8rem" $flex_direction="column" $align_items="center" $justify_content="center">
        <SelectModel setData={setData}></SelectModel>
        <Button onClick={handleButton} $marginTop="3rem" $variants="Medium" $width="20rem">Predict</Button>
      </Flex>
    </Flex>
  )

}

export default Predict