'use client'
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import { ModelConfigContext, ModelConfigType } from "@/Context/ModelConfig";
import { ProgressDataContext, ProgressDataType } from "@/Context/ProgressData";
import { useMemo, useState } from "react";
import Data from "./Data";
import Model from "./Model";
import { paramsProps } from "./Model/types";
import Nav from "./Nav";
import Output from "./Output";
import Progress from "./Progress";

export type DataType = {
  train?: File[]
  label?: File
  inputSize?: number[]
}

const Train = () => {
  const [modelConfig, setModelConfig] = useState<ModelConfigType>()
  const [progressData, setProgressData] = useState<ProgressDataType>()
  const [data, setData] = useState<DataType | null>(null)
  const [params, setParams] = useState<paramsProps[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [taskMessage, setTaskMessage] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const stableInputSize = useMemo(() => {
    return data?.inputSize ?? []
  }, [data?.inputSize])

  const handleTrain = async () => {

    setProgressData(undefined)
    setTaskMessage('処理を開始します')

    if (!data?.train || data.train.length === 0) {
      return setError("トレーニングデータが見つかりません");
    }
    if (!data?.label || data.label === undefined) {
      return setError("ラベルデータが見つかりません");
    }

    const lossFuncItems = params.filter(item => item.model === "LossFunc");
    if (lossFuncItems.length === 0) {
      return setError("損失関数が含まれていません。");
    }
    if (lossFuncItems.length > 1) {
      return setError("損失関数が複数含まれています。");
    }
    const lastItem = params[params.length - 1];
    if (lastItem.model !== "LossFunc") {
      return setError("損失関数は最後に配置してください。");
    }
    if (!modelConfig?.modelName) {
      return setError("モデルが選択されていません。")
    }

    try {
      const CHUNK_SIZE = 100;
      for (let i = 0; i < data.train.length; i += CHUNK_SIZE) {
        const chunk = data.train.slice(i, i + CHUNK_SIZE);
        const formData = new FormData();
        chunk.forEach((file) => {
          formData.append("files", file, file.webkitRelativePath || file.name);
        });
        if (data.label) {
          formData.append("label", data.label);
        }
        const res = await fetch(`${baseUrl}/train/upload_data`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.detail || "画像アップロードに失敗しました");
        } else {
          const data = await res.json();
          setTaskMessage(data.message)
        }
      }

      const formData = new FormData();
      formData.append("modelConfig", JSON.stringify(modelConfig));
      formData.append("params", JSON.stringify(params));

      const res = await fetch(`${baseUrl}/train/train_job_submit`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      setTaskMessage('画像をアップロード中')
      if (!res.ok) {
        const error = await res.json();
        if (res.status === 401) {
          return setError("ログインしてください");
        } else if (res.status === 400) {
          return setError(error.detail);
        } else {
          return setError("エラーが発生しました。もう一度お試しください");
        }
      }
      else {
        const data = await res.json();
        const taskId = data.task_id;
        const interval = setInterval(async () => {
          const response = await fetch(`${baseUrl}/train/task-status/${taskId}`, {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            setError("プログラムエラーが発生しました");
          }
          const data = await response.json();
          console.log(`状態: ${data.state}`);

          if (data.state === "PENDING") {
            setTaskMessage("まだ始まってない…");
          } else if (data.state === "STARTED") {
            setTaskMessage("学習中");
          } else if (data.state === "SUCCESS") {
            setTaskMessage("タスクが完了しました");
            clearInterval(interval);
          } else if (data.state === "FAILURE") {
            setTaskMessage("タスク失敗しました");
            clearInterval(interval);
          } else if (data.state === "RETRY") {
            setTaskMessage("再試行中…");
          } else if (data.state === "REVOKED") {
            setTaskMessage("取り消されました");
          }

          if (["SUCCESS", "FAILURE"].includes(data.state)) {
            setTaskMessage("タスクが終了しました");
            clearInterval(interval);
          
            setTimeout(() => {
              setTaskMessage("");
            }, 3000);
          }
        }, 1000);
      }

    } catch (err) {
      console.log(err);
      return setError("エラーが発生しました。もう一度お試しください");
    }

  }

  return (
    <ModelConfigContext.Provider value={{ modelConfig, setModelConfig }}>
      <Flex $flex_direction="column" $align_items="center">
        {error &&
          <Dialog onClick={() => { setError(null) }}>
            <Text $marginBottom="1rem">Error Info</Text>
            <Text $variants="Small" $color="red">{error}</Text>
          </Dialog>}
        <Nav nav="train"></Nav>
        <Data setData={setData}></Data>
        <Model inputSize={stableInputSize} setParams={setParams} params={params}></Model>
        <Button $marginTop="4rem" $variants="Medium" onClick={handleTrain}>Train</Button>
        {taskMessage && <Text $marginTop="1rem" $variants="Small">{taskMessage}</Text>}
        <ProgressDataContext.Provider value={{ progressData, setProgressData }}>
          <Flex $justify_content="space-between" $marginTop="6rem">
            <Progress></Progress>
          </Flex>
          <Output></Output>
        </ProgressDataContext.Provider>
      </Flex>
    </ModelConfigContext.Provider>
  )
}

export default Train