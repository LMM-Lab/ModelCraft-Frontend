'use client'
import dynamic from "next/dynamic";
import { paramsProps,TypeIO } from "../types";

type DnDProps={
  layerIO:TypeIO[]
  setLayerIO:React.Dispatch<React.SetStateAction<TypeIO[]>>
  setParams:React.Dispatch<React.SetStateAction<paramsProps[]>>
}

const DynamicDnD = dynamic(() => import("@/app/classification/train/Model/DnD/dynamicDnD"), { ssr: false });

function DnD({ layerIO,setLayerIO ,setParams}: DnDProps) {
  return <DynamicDnD layerIO={layerIO} setLayerIO={setLayerIO} setParams={setParams}/>;
}

export default DnD