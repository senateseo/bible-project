import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Korean from "./lang/kr.json";
import English from "./lang/en.json";
import "./style.css";

import "./i18n";

const locale = navigator.language;

let lang;
if (locale.toLowerCase().startsWith("ko")) {
  lang = Korean;
} else {
  lang = English;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </React.StrictMode>
);
