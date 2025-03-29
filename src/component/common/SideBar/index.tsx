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

const SideBarCSS = styled.div`
  background-color:${({ theme }) => theme.colors.sideBar};
  height:100vh;
  padding-top:2rem;
  position:sticky;
  top:0;
`

const SideBar = () => {
  const { user } = useUser()
  const pathname = usePathname()

  return (
    <SideBarCSS>
      <Flex $justify_content="center">
        <Text $variants="Large" $color="#ffffff" >ModelCraft</Text>
      </Flex>
      <Link href='/classification/train'>
        <Button $variants="nav" $isactive={(pathname === '/classification/train')} $marginTop="8rem">Classification</Button>
      </Link>
      <Box $borderButton={`1px solid${theme.colors.white}`} $margin="15rem auto 0 auto" $width="70%"></Box>
      <Link href='/modelList'>
        <Button $variants="nav" $isactive={(pathname === '/modelList')}>modelList</Button>
      </Link>
      <Link href='/accounts'>
        <Button $variants="nav" $isactive={(pathname === '/accounts')}>accounts</Button>
      </Link>
      {user ? (
        <Flex $justify_content="center" $marginTop="2rem">
          <Text $color="white">{user.username}</Text>
        </Flex>
      ) : (
        <Flex $justify_content="center" $marginTop="3rem">
          <Link href='/login'>
            <Button $variants="nav" $fontSize={theme.fontSize.Small} $height="3rem" $padding="0 1rem" $isactive={(pathname === '/login')} $marginRight="1rem">login</Button>
          </Link>
          <Link href='/register'>
            <Button $variants="nav" $fontSize={theme.fontSize.Small} $height="3rem" $padding="0 1rem" $isactive={(pathname === '/register')} $marginLeft="1rem">register</Button>
          </Link>
        </Flex>
      )}
    </SideBarCSS>
  )
}

export default SideBar