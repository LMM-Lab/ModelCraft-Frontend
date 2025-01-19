"use client";
import GlobalStyles from "@/styles/GlobalStyles";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import SideBar from "@/component/common/SideBar";
import Grid from "@/component/common/styles/Grid";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <main style={{backgroundColor:theme.colors.background}}>
              <Grid grid_template_columns="1.8fr 8.8fr">
                <SideBar />
                {children}
              </Grid>
            </main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
