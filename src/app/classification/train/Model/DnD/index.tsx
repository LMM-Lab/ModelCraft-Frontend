'use client'
import dynamic from "next/dynamic";
import { paramsProps } from "../types";

type DnDProps={
  params:paramsProps[]
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
}

const DynamicDnD = dynamic(() => import("@/app/classification/train/Model/DnD/dynamicDnD"), { ssr: false });

function DnD({ params,setParams}: DnDProps) {
  console.log('DnD:',params)
  return <DynamicDnD params={params} setParams={setParams}/>;
}

export default DnD