'use client'
import Model from "./Model";
import React, { useEffect, useMemo, useState } from "react";
import Progress from "./Progress";
import Flex from "@/component/common/styles/Flex";
import { ModelConfigContext, ModelConfigType } from "@/Context/ModelConfig";
import Output from "./Output";
import Nav from "./Nav";
import Data from "./Data";
import { paramsProps } from "./Model/types";
import Button from "@/component/common/Button";
import Dialog from "@/component/common/Dialog";
import Text from "@/component/common/Text";
import { ProgressDataContext, ProgressDataType } from "@/Context/ProgressData";

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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const stableInputSize = useMemo(() => {
    return data?.inputSize ?? []
  }, [data?.inputSize])

  const handleTrain = async () => {

    setProgressData(undefined)

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
        }
      }

      console.log("✅ すべての画像アップロードが完了");

      // ↓ ここで train_job_submit を安全に呼ぶ
      const formData = new FormData();
      formData.append("modelConfig", JSON.stringify(modelConfig));
      formData.append("params", JSON.stringify(params));

      const res = await fetch(`${baseUrl}/train/train_job_submit`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

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

      console.log("🎉 学習ジョブ送信完了");

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