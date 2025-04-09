'use client'
import Flex from "@/component/common/styles/Flex"
import Text from "@/component/common/Text"
import ProgressBar from "./ProgressBar"
import ProgressText from "./ProgressText"
import { useState,useEffect,useRef } from "react"
import { ProgressDataType, useProgressData } from "@/Context/ProgressData"
import { useUser } from "@/Context/User"

export type log={
  epoch:number
  trainLoss:number
  valLoss:number 
  time:number 
}

const Progress=()=>{
  const [logs,setLogs]=useState<log[]>([])
  const {progressData,setProgressData}=useProgressData()
  const {user}=useUser()
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null)
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

  useEffect(() => {
    let shouldReconnect = true

    const connect = () => {
      const ws = new WebSocket(`${wsUrl}/auth/ws?page=training`)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('✅ WebSocket 接続完了')
      }

      ws.onmessage = (e) => {
        try {
          const parsed:ProgressDataType=JSON.parse(e.data)
          if (('message' in parsed)){
            return  
          }
          setProgressData(parsed)
          console.log('data:',parsed)  
          setLogs((prev)=>[...prev,{
            epoch:parsed.epoch,
            trainLoss:parsed.loss_json.train,
            valLoss:parsed.loss_json.val,
            time:parsed.train_time,
          }])
        } catch (err) {
          console.log('Progress useEffect:', err)
        }
      }
      ws.onclose = () => {
        console.log('❌ WebSocket切断')
        if (shouldReconnect && user) {
          console.log('🔁 再接続を試みます...')
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

  useEffect(() => {
    if (progressData === undefined) {
      setLogs([])
      return
    }
  },[progressData])
  
  
  return(
    <Flex $flex_direction="column" $width="60rem" $borderRadius="15px" $backgroundColor="white">
      <Text $variants="Medium" $margin="2rem 0 0 3rem">Progress</Text>
      <ProgressBar maxEpoch={progressData?.max_epoch} logs={logs}></ProgressBar>
      <ProgressText logs={logs}></ProgressText>
    </Flex>
  )
}

export default Progress