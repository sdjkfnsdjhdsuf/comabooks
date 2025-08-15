import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Forms from "./routes/Forms";
import Home from "./routes/Home";
import axios from "axios";
import { serviceOptions } from "generated";
import { Provider } from "react-redux"; // Импорт Provider
import { store } from "./store"; // Импорт store
import { CoverPage } from "routes/CoverPage";
import { TokenChecker } from "token_wrapper";
import AddPhoto from "components/AddPhoto";
import Landing from "routes/Landing";
import Main from "New/routes/Main";
import FormsWrapper from "routes/FormsWrapper";
import Policy from "routes/Policy";
import Landing2 from "routes/Landing/Landing2";
import LandingNew from "routes/LandingNew";
import Analytics from "routes/Analytics";
import Onhold from "routes/Onhold";
import AnalyticsChecker from "routes/AnalyticsChecker";
import SalePage from "routes/SalePage";
import LandingUpdated from "routes/Red";
// import AddPhoto from "components/AddPhoto";

export const instance = axios.create({
  baseURL: "https://api.comabooks.org",
});

serviceOptions.axios = instance;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AnalyticsChecker />
      <Routes>
        <Route path="/" element={<LandingUpdated />} />
        <Route path="/login" element={<Home />} />
        <Route path="/forms" element={<Forms />}>
          <Route path=":id"     element={<FormsWrapper />} />
        </Route>
        <Route path="/addphoto/:templateId" element={<AddPhoto />} />
        <Route path="/addphoto/:templateId/:photoId" element={<AddPhoto />} />
        <Route path="/cover/:id" element={<CoverPage />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />

        <Route path="/policies" element={<Policy />} />
        <Route path="/onhold" element={<Onhold />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
