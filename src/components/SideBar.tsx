import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";

const menuItems = [
  { text: "Data Store", icon: <StoreIcon />, href: "/" },
  { text: "SKU", icon: <CategoryIcon />, href: "/sku" },
  { text: "Planning", icon: <BarChartIcon />, href: "/planning" },
  { text: "Charts", icon: <InsertChartIcon />, href: "/chart" },
];
const SideBar = () => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 180 }}
      component="nav"
      className="min-h-[calc(100vh-100)] "
    >
      {menuItems.map((item) => (
        <ListItemButton key={item.text} component="a" href={item.href}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <Typography></Typography>
          <ListItemText primary={item.text} sx={{ fontWeight: "bold" }} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default SideBar;
