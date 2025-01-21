import styled from "styled-components";
import Image from "next/image";
import React, { useRef, useState } from "react";
import DefaultUser from '@/public/images/DefaultUser.svg'

type ImageInputProps={
  onFile:(icon:File)=> void;
  size?:number
}

const InputImage=({onFile,size=70}:ImageInputProps)=>{
  const [imagePath,setImagePath]=useState<string|null>(null)
  const InputRef=useRef<HTMLInputElement>(null)

  const handleInput=()=>{
    InputRef.current?.click()
  }

  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const imageFile=event.target.files?.[0]
    if(imageFile){
      const imagePath=URL.createObjectURL(imageFile)
      onFile(imageFile)
      setImagePath(imagePath)
    }
  }
  return (
    <div>
      <input onChange={onChange} type="file" accept="image/*" style={{display:'none'}} ref={InputRef}/>
      <button onClick={handleInput} type="button" style={{cursor:'pointer'}}>
        {imagePath ? 
        <Image width={size} height={size} src={imagePath} style={{borderRadius:'50%'}} alt='Uploaded user icon'></Image>
        :
        <Image width={size} height={size} src={DefaultUser} style={{borderRadius:'50%'}} alt='Default user icon'></Image>}
      </button>
    </div>
  )
}

export default InputImage