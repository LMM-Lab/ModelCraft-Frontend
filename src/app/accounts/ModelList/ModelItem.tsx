'use client'
import Flex from "@/component/common/styles/Flex";
import Text from "@/component/common/Text";
import React, { ReactNode } from "react";
import dayjs from "dayjs";

type ModelItemProps = {
  modelName: string;
  size: number | null;
  timestamp: string;
  children: ReactNode;
}

function formatFileSize(bytes: number|null): string {
  if (bytes === 0) return '0 Bytes';
  if (bytes === null) return '';

  const k = 1024;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  let formattedSize: string;

  if (units[i] === 'KB' || units[i] === 'MB') {
    formattedSize = `${Math.round(size)}`; 
  } else {
    formattedSize = size.toFixed(1);
  }
  return `${formattedSize} ${units[i]}`;
}

const ModelItem = ({ modelName, size, timestamp, children }: ModelItemProps) => {
  const fontSize = '2rem'
  return (
    <Flex $align_items="end" $marginTop="1rem">
      <Flex $width="100%" $height="5rem" $borderRadius="10px" $marginRight="0.5rem" $justify_content="space-around" $align_items="center" $backgroundColor="#F5F7FA">
        <Text $fontSize={fontSize} $textOverflow="ellipsis">{modelName}</Text>
        <Text $fontSize={fontSize}>{formatFileSize(size)}</Text>
        <Text $fontSize={fontSize}>{dayjs(timestamp).format("YYYY/MM/DD HH:mm")}</Text>
      </Flex>
      {children}
    </Flex>
  )
}

export default ModelItem