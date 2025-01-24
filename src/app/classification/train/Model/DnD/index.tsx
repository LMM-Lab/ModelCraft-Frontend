'use client'
import dynamic from "next/dynamic";
import { paramsProps } from "..";

const DynamicDnD = dynamic(() => import("@/app/classification/train/Model/DnD/dynamicDnD"), { ssr: false });

function DnD({ params }: { params: paramsProps[] }) {
  return <DynamicDnD params={params} />;
}

export default DnD