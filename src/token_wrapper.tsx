import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const TokenChecker = (props: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = window.location.pathname;
    if (localStorage.getItem("token") != null) {
      if (pathName == "/") {
        navigate("/forms");
        // return;
      }
    } else {
      if (pathName != "/") {
        navigate("/");
        // return;
      }
    }
    const interval = setInterval(() => {
      const pathName = window.location.pathname;
      if (localStorage.getItem("token") != null) {
        if (pathName == "/") navigate("/forms");
      } else {
        if (pathName != "/") navigate("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <>{props.children}</>;
};
