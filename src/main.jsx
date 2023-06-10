import React from "react";
import ReactDOM from "react-dom/client";

import "./css/index.css"
import Favicon from "react-favicon";
import favicon from './images/favicon.ico'

import { AppRoutes } from "./js/routes/AppRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Favicon url={favicon}/>
    <AppRoutes />
  </React.StrictMode>
);
