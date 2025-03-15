import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";
import DataStore from "./components/DataStore";
import Sku from "./components/Sku";
import Planning from "./components/Planning";
import Charts from "./components/Charts";

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
        element: <Charts />,
      },
      {
        path: "planning",
        element: <Planning />,
      },
    ],
  },
]);

export default router;
