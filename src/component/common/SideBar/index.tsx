'use client';
import styled from "styled-components";
import Text from "../Text";
import Button from "../Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Flex from "../styles/Flex";
import theme from "@/styles/theme";
import Box from "../styles/Box";
import { useUser } from "@/Context/User";
import Image from "next/image";
import { useState } from "react";

const SideBarCSS = styled.div`
  background-color:${({ theme }) => theme.colors.sideBar};
  height:100vh;
  padding-top:2rem;
  position:sticky;
  top:0;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
`
const FullWidthLink = styled(Link)`
  display: block;
  width: 90%;
`;

const BoxBut=styled(Flex)`
  position:absolute;
  
`

const SideBar = () => {
  const { user,setUser } = useUser()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleButton=async()=>{
    const res=await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      console.error('ログアウト失敗:', error);
    } else {
      console.log('ログアウト成功:');
      setUser(undefined)
      setIsOpen(!isOpen)
    }
  }

  return (
    <SideBarCSS>
      <Flex $justify_content="center" $marginBottom="8rem">
        <Text $variants="Large" $color="#ffffff" >ModelCraft</Text>
      </Flex>
      <FullWidthLink href='/classification/train'>
        <Button $variants="nav" $isactive={(pathname === '/classification/train' || pathname === '/classification/predict')}>Classification</Button>
      </FullWidthLink>
      <Box $borderButton={`1px solid${theme.colors.white}`} $margin="15rem auto 1rem auto" $width="70%"></Box>
      {/* <Link href='/modelList'>
        <Button $variants="nav" $isactive={(pathname === '/modelList')}>modelList</Button>
      </Link> */}
      <FullWidthLink href='/accounts/EditProfile'>
        <Button $variants="nav" $isactive={(pathname === '/accounts')}>accounts</Button>
      </FullWidthLink>
      {user ? (
        <>
          <Flex onClick={()=>setIsOpen(!isOpen)} $margin="14rem auto 0 auto" $width="12rem" $height="4rem" $borderRadius="5px" $justify_content="center" $align_items="center" onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.isActive)} onMouseLeave={(e) => (e.currentTarget.style.background = theme.colors.sideBar)}>
            {user?.icon && <Image src={user?.icon} height={30} width={30} alt="" style={{borderRadius:'50%'}}></Image>}
            <Text $marginLeft="0.8rem" $color="white">{user.username}</Text>
          </Flex>
          {isOpen && (
            <Button $width="12rem" onClick={handleButton} $variants="Small" $margin="0.5rem auto 0 auto" $padding="0 1rem">logout</Button>
          )}
        </>
      ) : (
        <Flex $justify_content="center" $marginTop="14rem">
          <Link href='/login'>
            <Button $variants="nav" $fontSize={theme.fontSize.Small} $height="3rem" $padding="0 1rem" $marginRight="1rem">login</Button>
          </Link>
          <Link href='/register'>
            <Button $variants="nav" $fontSize={theme.fontSize.Small} $height="3rem" $padding="0 1rem" $marginLeft="1rem">register</Button>
          </Link>
        </Flex>
      )}
    </SideBarCSS>
  )
}

export default SideBar