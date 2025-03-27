import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LandingUpdated from "routes/Landing/RedOne";
// import AddPhoto from "components/AddPhoto";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
    {/* <FacebookPixel /> */}
      <Routes>
        {/* <Route path="/" element={<Landing />} />
        <Route path="/ads" element={<Landing2 />} /> */}
        <Route path="/" element={<LandingUpdated />} />
      </Routes>
    </BrowserRouter>
);
