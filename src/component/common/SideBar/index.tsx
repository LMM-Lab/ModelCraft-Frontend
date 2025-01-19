'use client';
import styled from "styled-components";
import Text from "../Text";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Flex from "../styles/Flex";
import theme from "@/styles/theme";

const SideBarCSS = styled.div`
  background-color:${({ theme }) => theme.colors.sideBar};
  height:100vh;
  padding-top:2rem;
`


const SideBar = () => {

  const pathname = usePathname()

  const nav = [
    { name: 'Classification', path: '/classification' },
    { name: 'register', path: '/register' },
  ]

  const router = useRouter()

  const handleNavClassification = () => {
    router.push('/classification/train')
  }

  const handleNavModelList = () => {
    router.push('/modelList')
  }

  const handleNavAccounts = () => {
    router.push('/accounts')
  }

  return (
    <div>
      <SideBarCSS>
        <Flex $justify_content="center">
          <Text variants="Large" color="white" >ModelCraft</Text>
        </Flex>
        <Link href='/classification/train'>
          <Button variants="nav" $isactive={(pathname === '/classification/train')} $marginTop="8rem">Classification</Button>
        </Link>
        <Link href='/modelList'>
          <Button variants="nav" $isactive={(pathname === '/modelList')}>modelList</Button>
        </Link>
        <Link href='/accounts'>
          <Button variants="nav" $isactive={(pathname === '/accounts')}>accounts</Button>
        </Link>
        <Flex $marginTop="10rem">
          <Link href='/login'>
            <Button variants="nav" fontSize={theme.fontSize.Small} height="3rem" padding="2rem" $isactive={(pathname === '/login')}>login</Button>
          </Link>
          <Link href='/register'>
            <Button variants="nav" fontSize={theme.fontSize.Small} height="3rem" padding="2rem" $isactive={(pathname === '/register')}>register</Button>
          </Link>

        </Flex>


      </SideBarCSS>
    </div>
  )
}

export default SideBar