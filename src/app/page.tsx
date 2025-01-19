'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import ButtonCSS from "@/component/Button";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <ButtonCSS size="small">train</ButtonCSS>
        <GlobalStyles />
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
