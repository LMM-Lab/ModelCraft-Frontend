import React from "react";
import { Preview } from "@storybook/react";
import { ThemeProvider,createGlobalStyle } from "styled-components";
import theme from "../src/styles/theme";

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    font-size: 62.5%;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }


  * {
    box-sizing: border-box;
    font-family: 'Crimson Text', serif; 
  }

  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators:[
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
  // tags: ['autodocs'] 
};


export default preview;