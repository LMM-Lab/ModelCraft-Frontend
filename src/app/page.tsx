'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
    </ThemeProvider>
  );
}
