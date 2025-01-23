'use client'
import dynamic from "next/dynamic";

const DynamicDnD = dynamic(() => import("@/app/classification/train/Model/DnD/dynamicDnD"), { ssr: false });

function DnD() {
  return <DynamicDnD/>;
}

export default DnD