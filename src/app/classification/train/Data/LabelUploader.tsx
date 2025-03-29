'use client'
import Button from '@/component/common/Button';
import Flex from '@/component/common/styles/Flex';
import Text from '@/component/common/Text';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DataType } from '../page';

type LabelUploaderProps={
  setData:React.Dispatch<React.SetStateAction<DataType|null>>;
}

const LabelUploader = ({setData}:LabelUploaderProps) => {
  const [labelInfo, setLabelInfo] = useState<number | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file=acceptedFiles[0]
    if(!file) return

    const reader=new FileReader()
    reader.onload=(event)=>{
      if(event.target?.result){
        const text=event.target.result as string
        const rows = text.split("\n").map(line => line.trim()).filter(line => line !== "");
        setLabelInfo(rows.length)
        setData((prev)=>({
          ...prev,
          label:file
        }))
      }
    }
    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxFiles:1,
    noClick: true
  })

  return (
    <Flex {...getRootProps()} $width='35rem' $height='15rem' style={isDragActive ? {border:'2px dashed#4F95D2'}:{border:'2px dashed#ffffff'}}>
      <Flex $flex='2.2' $flex_direction='column' $align_items='center'>
        <FontAwesomeIcon style={{ fontSize: '3rem', color: '#4F95D2', width: '3rem',marginTop:'3rem'}} icon={faArrowUpFromBracket} />
        <Text $fontSize='1.5rem' $marginTop='1rem' $variants='Small'>Drop your label file</Text>
        <Text $fontSize='1.5rem' $margin='0.6rem' $variants='Small'>or</Text>
        <Button type='button' $width='15rem' $height='2.5rem' onClick={open}>Browser</Button>
      </Flex>
      <Flex $flex='1.5' $flex_direction='column' $align_items='center' $height='auto' $borderRadius='0 10px 10px 0' $backgroundColor='#F0F0F0'>
        {labelInfo && (
          <>
            <Text $marginTop='2.5rem' $variants='Small'>{labelInfo} labels</Text>
          </>
        )}
      </Flex>
      <input {...getInputProps()} />
    </Flex>
  )
}

export default LabelUploader;