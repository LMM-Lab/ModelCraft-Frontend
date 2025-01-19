"use client";
import GlobalStyles from "@/styles/GlobalStyles";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" style={{ fontSize: '62.5%' }}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            {children}
            <GlobalStyles />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
