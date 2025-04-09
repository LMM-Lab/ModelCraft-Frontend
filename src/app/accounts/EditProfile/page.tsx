'use client'
import styled from "styled-components";
import React, { useRef, useState } from "react";
import Text from "@/component/common/Text";
import Button from "@/component/common/Button";
import Flex from "@/component/common/styles/Flex";
import Input from "@/component/common/Input";
import { useUser } from "@/Context/User";

type RequestData={
  username:string;
  icon:File | null;
}

const Preview = styled.div`
  width: 7rem;
  aspect-ratio: 1 / 1;
  margin-right:1rem;
  border-radius: 50%;
  border:1px solid#c9c9c9;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius:50%;
    object-fit: cover;
  }
`;

const ImageUploadButton = styled.button`
  width:100%;
  height:4rem;
  font-size: 1.7rem;
  background-color: transparent;
  border: 2px solid #DDDDDD;
  border-radius: 10px;
  &:hover {
    border:2px solid#6D9DC5;;
  }
`

const HiddenInput = styled.input`
  display: none;
`;


const EditProfile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const { setUser } = useUser()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIcon(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async () => {
    // if (!icon || !username) return;
    const formData = new FormData();
    if (username != null) {
      formData.append('username', username);
    }
    
    if (icon) {
      formData.append('icon', icon);
    }
    console.log('Icon',icon)

    const res = await fetch('http://localhost:8000/auth/editProfile', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (!res.ok) {
      console.error('Failed to update profile:', await res.json());
    } else {
      const userData = await res.json();
      setUser({ 'username': userData.username ,'icon':userData.icon})
    }

    const userResponse = await fetch("http://localhost:8000/auth/me", {
      method: "GET",
      credentials: "include",
    });
    if (userResponse.ok) {
      const userData = await userResponse.json();
      setUser({ 'username': userData.username ,'icon':userData.icon})
    } else {
      console.log("ユーザー情報取得失敗");
    }
  };

  return (
    <Flex $margin="2rem 0 0 3rem" $flex_direction="column" $width="40%" $height="fit-content">
      <Text $variants="Large">Edit profile</Text>
      <Flex $marginTop="3rem" $width="100%" $flex_direction="column" $justify_content="center">
        <Text $fontSize="2rem">Icon</Text>
        <Flex $marginTop="1rem" $align_items="center">
          <Preview>
              {previewSrc ? (
                <img src={previewSrc} alt="Preview" />
              ) : (
                <span style={{ color: '#999',fontSize:'1.5rem'}}>No icon</span>
              )}
          </Preview>
          <ImageUploadButton onClick={handleClick}>Upload image</ImageUploadButton>
        </Flex>
      </Flex>
      <Flex $marginTop="2rem" $justify_content="center" $flex_direction="column">
        <Text $fontSize="2rem">Name</Text>
        <Input onChange={(e)=>setUsername(e.target.value)} placeholder="e-username" $variants="account"></Input>
      </Flex>
      <Button onClick={handleSubmit} $width="100%" $height="5rem" $fontSize="2rem" $marginTop="6rem" >Save</Button>
      <HiddenInput type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} />
    </Flex>
  )

}

export default EditProfile