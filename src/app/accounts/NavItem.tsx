import styled from "styled-components"
import React, { ReactNode } from "react";
import Text from "@/component/common/Text";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  text?: string;
  children?: ReactNode;
  color?:string;
};

const StyledLink = styled(Link)<{ $active: boolean }>`
  margin-top:2rem;
  display: flex;
  align-items: center;
  width:100%;
  height:4.5rem;
  border-radius: 10px;
  font-weight: 500;
  border: 2px solid ${({ $active }) => ($active ? "#6D9DC5" : "transparent")};
  color: ${({ $active }) => ($active ? "#dfdfdf" : "#000000")};

  &:hover {
    border: ${({ $active }) => ($active ? "2px solid#6D9DC5" : "2px solid#6D9DC5")};
  }
`

const Icon=styled.div`
margin:0 1rem 0 2rem;
`

const NavItem=({href,text,children,color}:NavItemProps)=>{

  const pathname = usePathname();
  const isActive = pathname === href;
  return(
    <StyledLink href={href} $active={isActive}>
      <Icon>{children}</Icon>
      <Text $color={color}>{text}</Text>
    </StyledLink>
  )
}

export default NavItem