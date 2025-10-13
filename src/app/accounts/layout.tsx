'use client'
import { ReactNode } from "react";
import styled from "styled-components";
import NavItem from "./NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import Flex from "@/component/common/styles/Flex";

const ContainerDiv = styled.div`
  width:90rem;
  height:90vh;
  background-color:white;
  border-radius:10px;
  padding-top:8rem;
  margin:3rem auto 0 auto;
  display:flex;
  justify-content:center;
`

const Line=styled.div`
  border:1px solid #d0cece;
  width:80%;
  margin:3rem 0 1rem 0;
`

const fontSize='2.5rem'

export default function Layout({ children }: { children: ReactNode }) {
  if (!children) return null;
  const navColor="#4e4e4e"
  return (
    <ContainerDiv>
      <Flex $marginRight="3rem" $width="25%" $height="fit-content" $flex_direction="column" $justify_content="center" $align_items="center">
        <NavItem href="/accounts/EditProfile" text="Edit profile" color={navColor}><FontAwesomeIcon icon={faCircleUser} style={{fontSize:fontSize,color:navColor}}/></NavItem>
        <NavItem href="/accounts/Password" text="Password" color={navColor}><FontAwesomeIcon icon={faLock} style={{fontSize:fontSize,color:navColor}}/></NavItem>
        <NavItem href="/accounts/ModelList" text="Model list" color={navColor}><FontAwesomeIcon icon={faHexagonNodes} style={{fontSize:fontSize,color:navColor}}/></NavItem>
        <NavItem href="/accounts/Logout" text="Logout" color={navColor}><FontAwesomeIcon icon={faRightFromBracket} style={{fontSize:fontSize,color:navColor}}/></NavItem>
        <Line></Line>
        <NavItem href="/accounts/DeleteAccount" text="Delete account" color="#e20000"><FontAwesomeIcon icon={faXmark} style={{fontSize:'3.5rem',color:'#e20000'}}/></NavItem>
      </Flex>
      {children}
    </ContainerDiv>
  );
}