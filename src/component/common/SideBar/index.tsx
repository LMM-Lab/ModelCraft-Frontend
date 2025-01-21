'use client';
import styled from "styled-components";
import Text from "../Text";
import Button from "../Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Flex from "../styles/Flex";
import theme from "@/styles/theme";
import Box from "../styles/Box";

const SideBarCSS = styled.div`
  background-color:${({ theme }) => theme.colors.sideBar};
  height:100vh;
  padding-top:2rem;
`

const SideBar = () => {
  const pathname = usePathname()

  return (
    <div>
      <SideBarCSS>
        <Flex $justify_content="center">
          <Text variants="Large" color="white" >ModelCraft</Text>
        </Flex>
        <Link href='/classification/train'>
          <Button variants="nav" $isactive={(pathname === '/classification/train')} $marginTop="8rem">Classification</Button>
        </Link>
        <Box $borderButton={`1px solid${theme.colors.white}`} $margin="15rem auto 0 auto" $width="70%"></Box>
        <Link href='/modelList'>
          <Button variants="nav" $isactive={(pathname === '/modelList')}>modelList</Button>
        </Link>
        <Link href='/accounts'>
          <Button variants="nav" $isactive={(pathname === '/accounts')}>accounts</Button>
        </Link>
        <Flex $justify_content="center" $marginTop="3rem">
          <Link href='/login'>
            <Button variants="nav" fontSize={theme.fontSize.Small} height="3rem" padding="1rem" $isactive={(pathname === '/login')} $marginRight="1rem">login</Button>
          </Link>
          <Link href='/register'>
            <Button variants="nav" fontSize={theme.fontSize.Small} height="3rem" padding="1rem" $isactive={(pathname === '/register')} $marginLeft="1rem">register</Button>
          </Link>
        </Flex>
      </SideBarCSS>
    </div>
  )
}

export default SideBar