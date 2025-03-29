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

  const stableInputSize = useMemo(() => {
    return data?.inputSize ?? []
  }, [data?.inputSize])

  const handleTrain = async () => {

    const lossFuncItems = params.filter(item => item.model === "LossFunc");
    if (lossFuncItems.length === 0) {
      return setError("損失関数 (LossFunc) が含まれていません。");
    }
    if (lossFuncItems.length > 1) {
      return setError("損失関数 (LossFunc) が複数含まれています。");
    }
    const lastItem = params[params.length - 1];
    if (lastItem.model !== "LossFunc") {
      return setError("損失関数 (LossFunc) は最後に配置してください。");
    }
    if (!data?.train || data.train.length === 0) {
      console.warn("No training data found");
      return;
    }

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
      formData.append("modelConfig", JSON.stringify(modelConfig));
      formData.append("params", JSON.stringify(params));

      try {
        const res = await fetch("http://localhost:8000/train/train_job_submit", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.warn("サーバーエラー:", res.status, errorText);
          alert(`サーバーエラー: ${res.status} ${res.statusText}`);
          return;
        }

        const result = await res.json();
      } catch (err) {
        console.error("通信エラー:", err);
      }
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
        <Button $variants="Medium" onClick={handleTrain}>Train</Button>
        <ProgressDataContext.Provider value={{ progressData, setProgressData }}>
          <Flex $justify_content="space-between" $marginTop="3rem">
            <Progress></Progress>
          </Flex>
          <Output></Output>
        </ProgressDataContext.Provider>
      </Flex>
    </ModelConfigContext.Provider>
  )
}

export default Train