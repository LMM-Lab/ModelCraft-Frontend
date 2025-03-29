"use client";
import GlobalStyles from "@/styles/GlobalStyles";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import SideBar from "@/component/common/SideBar";
import Grid from "@/component/common/styles/Grid";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // 必須: CSSをインポート
config.autoAddCss = false; // 自動CSS追加を無効化
import { useProgressBarAtTransition } from "@/hooks/useProgressBarAtTransition";
import { UserContext, UserType } from "@/Context/User";
import { useEffect, useState } from "react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  useProgressBarAtTransition()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8000/auth/me", {
        credentials: "include",
      });
      if (res.ok) {
        const user = await res.json();
        setUser({'username':user.username})
      }
    };
    fetchUser();
  }, []);

  return (
    <html lang="en">
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
