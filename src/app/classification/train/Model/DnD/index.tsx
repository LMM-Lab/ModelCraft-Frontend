'use client'
import dynamic from "next/dynamic";
import { paramsProps } from "..";

type DnDProps={
  params:paramsProps[]
  setParams:(params:paramsProps[])=>void
}

const DynamicDnD = dynamic(() => import("@/app/classification/train/Model/DnD/dynamicDnD"), { ssr: false });

function DnD({ params,setParams }: DnDProps) {
  return <DynamicDnD params={params} setParams={setParams} />;
}

export default DnD