import { createBrowserRouter, createHashRouter } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";
import DataStore from "./components/DataStore";
import Sku from "./components/Sku";
import Planning from "./components/Planning";
import Charts from "./components/Charts";

const basename = import.meta.env.VITE_BASENAME || "/";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <SidebarLayout />,
      children: [
        { path: "", element: <DataStore /> },
        { path: "sku", element: <Sku /> },
        { path: "chart", element: <Charts /> },
        { path: "planning", element: <Planning /> },
      ],
    },
  ],
  {
    basename: basename,
  }
);

export default router;
