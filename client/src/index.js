import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Korean from "./lang/kr.json";
import English from "./lang/en.json";

import "./i18n";

const locale = navigator.language;

let lang;
if (locale.toLowerCase().startsWith("ko")) {
  lang = Korean;
} else {
  lang = English;
}

console.log(locale);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
