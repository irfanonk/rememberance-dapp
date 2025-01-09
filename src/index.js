import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "./contex/web3Context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#000000",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Web3Provider>
        <App />
        <text><center><br></br>Use CryoBit to memorialize your loved ones on the block-chain forever. <br></br>
          Each Cryobit is written directly to the block-chain and is irreversible.</center></text>
      </Web3Provider>
    </ThemeProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
