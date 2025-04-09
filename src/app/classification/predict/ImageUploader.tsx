'use client'
import Button from '@/component/common/Button';
import Flex from '@/component/common/styles/Flex';
import Text from '@/component/common/Text';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PredictDataType } from './page';

type ImageUploaderProps={
  setData:React.Dispatch<React.SetStateAction<PredictDataType|null>>;
}

type imageInfo = {
  counts: number
  size: {
    width: number
    height: number
    channel?: number
  }
  sample: string
}

const ImageUploader = ({setData}:ImageUploaderProps) => {
  const [imageInfo, setImageInfo] = useState<imageInfo | null>(null)

  const getImage = (file: File): Promise<{ width: number, height: number }> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'))
    const size = await getImage(imageFiles[0])
    const sample = URL.createObjectURL(imageFiles[0])
    setImageInfo({
      counts: acceptedFiles.length,
      size: {
        width: size.width,
        height: size.height
      },
      sample: sample
    })
    setData((prev)=>({
      ...prev,
      image:imageFiles,
    }))
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': [], 
    },
  })

  return (
    <Flex {...getRootProps()} $width='35rem' $height='15rem' style={isDragActive ? {border:'2px dashed#4F95D2'}:{border:'2px solid#ffffff'}}>
      <Flex $flex='2.2' $flex_direction='column' $align_items='center'>
        <FontAwesomeIcon style={{ fontSize: '3rem', color: '#4F95D2', width: '3rem',marginTop:'3rem'}} icon={faArrowUpFromBracket} />
        <Text $fontSize='1.5rem' $marginTop='1rem' $variants='Small'>Drop your image</Text>
        <Text $fontSize='1.5rem' $margin='0.6rem' $variants='Small'>or</Text>
        <Button type='button' $width='15rem' $height='2.5rem' onClick={open}>Browser</Button>
      </Flex>
      <Flex $flex='1.5' $flex_direction='column' $align_items='center' $height='auto' $borderRadius='0 10px 10px 0' $backgroundColor='#F0F0F0'>
        {imageInfo && (
          <>
            <Text $marginTop='2.5rem' $variants='Small'>{imageInfo?.counts} images</Text>
            <Text $marginTop='0.5rem' $variants='Small'>{imageInfo?.size.width}×{imageInfo?.size.height}</Text>
            <Flex $marginTop='1.5rem' $width='90%' $justify_content='center' $flex_wrap='wrap'>
              {imageInfo && <Image width={25} height={25} style={{ borderRadius: '10px', margin: '0.2rem' }} alt='' src={imageInfo.sample}></Image>}
            </Flex>
          </>
        )}
      </Flex>
      <input {...getInputProps()} />
    </Flex>
  )
}

export default ImageUploader;