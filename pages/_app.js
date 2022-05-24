import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

import THEME from "../theme/Theme";
import ThemeProvider from "../components/technical/themeProvider/ThemeProvider";

const setDefaultColors = (variant = "light") => {
  return Object.entries(THEME.colors[variant]).reduce((accu, [rule, value]) => {
    return `${rule}:${value}; ${accu}`;
  }, "");
};

const setFonts = () => {
  const strings = Object.entries(THEME.font).map(([_, category]) => {
    return Object.entries(category).reduce((accu, [rule, value]) => {
      return `${rule}:${value}; ${accu}`;
    }, "");
  });
  return strings.join(";");
};

const GlobalStyle = createGlobalStyle`
  body {
   
    margin: 0;
    font-family: "Open Sans", sans-serif;
    
    *, *:before, *:after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    *:focus {
      -webkit-tap-highlight-color: transparent;
      outline: none;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
    }
    
    ::selection{
      background-color: transparent;
    }
 

    > div:first-child,
    div#__next,
    div#__next > div {
      height:100vh;
      background-color: var(--color-background);
    }
  }



  :root{
    ${setDefaultColors()};
    ${setFonts()};
  }

`;

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
