import { DATA_VIEWER_APP } from "../constant";
import CompanyLogo from "../assets/companyLogo.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

const Header = () => {
  return (
    <nav className="flex justify-between py-4 px-10  min-h-[80px] ">
      <div className="h-12">
        <img src={CompanyLogo} alt="logo" className="h-12" />
      </div>
      <h1 className="h-1 text-4xl font-semibold"> {DATA_VIEWER_APP}</h1>
      <div className="flex lg:flex-row gap-4 items-center">
        <div className="">
          <AccountCircleIcon sx={{ fontSize: "3rem" }} />
        </div>
        <div className="text-3xl mb-2">
          <ExpandCircleDownIcon />
        </div>
      </div>
    </nav>
  );
};

export default Header;
