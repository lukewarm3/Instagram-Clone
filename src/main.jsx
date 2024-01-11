import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react"
import App from './App.jsx'
import './index.css'
import { extendTheme } from "@chakra-ui/react"
import {mode} from "@chakra-ui/theme-tools" // mode is used to switch color based on light or dark mode
import { BrowserRouter } from 'react-router-dom'

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "black")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",  //our applications have dark mode as default
  useSystemColorMode: false,
};

// extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
