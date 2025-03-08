import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";
import DataStore from "./components/DataStore";
import Sku from "./components/Sku";

const router = createBrowserRouter([
  {
    path: "",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <DataStore />,
      },
      {
        path: "sku",
        element: <Sku />,
      },
      {
        path: "chart",
        element: <Sku />,
      },
      {
        path: "planning",
        element: <Sku />,
      },
    ],
  },
]);

export default router;
