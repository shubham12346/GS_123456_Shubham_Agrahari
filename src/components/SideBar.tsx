import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Data Store", icon: <StoreIcon />, href: "/" },
  { text: "SKU", icon: <CategoryIcon />, href: "/sku" },
  { text: "Planning", icon: <BarChartIcon />, href: "/planning" },
  { text: "Charts", icon: <InsertChartIcon />, href: "/chart" },
];
const SideBar = () => {
  const location = useLocation(); // Get current path
  const navigate = useNavigate(); // Get navigate function

  return (
    <List
      sx={{ width: "100%", maxWidth: 180 }}
      component="nav"
      className="min-h-[calc(100vh-100)] "
    >
      {menuItems.map((item) => {
        const isActive = location.pathname === item.href;

        return (
          <ListItemButton
            key={item.text}
            component="div"
            sx={{
              backgroundColor: isActive ? "#ccc" : "transparent",
              "&:hover": { backgroundColor: "#ccc" },
            }}
            onClick={() => navigate(item.href)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography></Typography>
            <ListItemText primary={item.text} sx={{ fontWeight: "bold" }} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default SideBar;
