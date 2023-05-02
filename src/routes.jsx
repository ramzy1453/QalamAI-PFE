import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./pages";
import Landing from "./pages/landing";
import NotFound from "./pages/404";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/landing",
      element: <Landing />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
}
