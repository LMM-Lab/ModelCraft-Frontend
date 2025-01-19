'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import ButtonCSS from "@/component/Button";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Text from "@/component/Text";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <ButtonCSS variants="Large">
          train
        </ButtonCSS>
        <Text variants="ExtraLarge">ModelCraft</Text>
        <GlobalStyles />
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}
