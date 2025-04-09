'use client'
import dynamic from "next/dynamic";
import { paramsProps } from "../types";

type DnDProps={
  params:paramsProps[]
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
  handleParamsUpdate:(params:paramsProps[],prev:paramsProps[])=>paramsProps[]
  inputSize:number[]
  setError:React.Dispatch<React.SetStateAction<string|null>>
}

const DynamicDnD = dynamic(() => import("@/app/classification/train/Model/DnD/dynamicDnD"), { ssr: false });

function DnD({ params,setParams,handleParamsUpdate,inputSize,setError}: DnDProps) {
  return <DynamicDnD setError={setError} inputSize={inputSize} params={params} setParams={setParams} handleParamsUpdate={handleParamsUpdate}/>;
}

export default DnD