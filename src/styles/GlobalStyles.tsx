import { createGlobalStyle } from "styled-components";

const GlobalStyles=createGlobalStyle`
  html,
  body,
  textarea {
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

button {
  appearance: none; /* ブラウザのデフォルトスタイルを削除 */
  -webkit-appearance: none; /* Safari用のリセット */
  -moz-appearance: none; /* Firefox用のリセット */
  border: none; /* デフォルトの枠線を削除 */
  padding: 0; /* デフォルトのパディングを削除 */
  background: none; /* 背景をリセット */
}

`

export default GlobalStyles