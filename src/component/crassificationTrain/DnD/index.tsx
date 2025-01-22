'use client'
import dynamic from "next/dynamic";

const DynamicDnD = dynamic(() => import("@/component/crassificationTrain/DnD/dynamicDnD"), { ssr: false });

function DnD() {
  return <DynamicDnD/>;
}

export default DnD