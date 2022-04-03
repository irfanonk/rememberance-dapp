import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "./contex/web3Context";

ReactDOM.render(
  <BrowserRouter>
    <Web3Provider>
      <App />
    </Web3Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
