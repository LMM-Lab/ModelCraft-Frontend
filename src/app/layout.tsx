"use client";
import GlobalStyles from "@/styles/GlobalStyles";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import SideBar from "@/component/common/SideBar";
import Grid from "@/component/common/styles/Grid";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; 
import { useProgressBarAtTransition } from "@/hooks/useProgressBarAtTransition";
import { UserContext, UserType } from "@/Context/User";
import { useEffect, useState } from "react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  useProgressBarAtTransition()
  const [user, setUser] = useState<UserType>()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseUrl}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const user = await res.json();
          setUser({'username':user.username, icon:user.icon})
        }
      } catch (error) {
        console.log("バックエンドに接続できませんでした");
      }
    };
    fetchUser();
  }, []);

  return (
    <html lang="en" style={{overflowY: 'scroll'}}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <main style={{backgroundColor:theme.colors.background}}>
              <Grid $gridTemplateColumns="240fr 1043fr">
                <UserContext.Provider value={{user,setUser}}>
                  <SideBar></SideBar>
                  {children}
                </UserContext.Provider>
              </Grid>
            </main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
