import { Outlet } from "react-router-dom";
import Header from "../components/Header.js";
import SideBar from "../components/SideBar.js";

const SidebarLayout = () => {
  return (
    <main>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="rightsection w-full ">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default SidebarLayout;
