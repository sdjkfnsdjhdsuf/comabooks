import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forms from "./routes/Forms";
import Home from "./routes/Home";
import axios from "axios";
import { serviceOptions } from "generated";

export const instance = axios.create({
  baseURL: "https://a71a-79-142-56-78.ngrok-free.app",
});
serviceOptions.axios = instance
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forms" element={<Forms />} />
    </Routes>
  </BrowserRouter>
);
