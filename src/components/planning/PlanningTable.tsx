import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const PlanningTable = () => {
  // ✅ Function to create week column structure dynamically
  const createWeekColumn = (
    weekName,
    unitsField,
    dollarsField,
    gmDollarsField,
    gmPercentField
  ) => ({
    headerName: weekName,
    children: [
      { headerName: "Sales Units", field: unitsField },
      { headerName: "Sales Dollars", field: dollarsField },
      { headerName: "GM Dollars", field: gmDollarsField },
      {
        headerName: "GM Percent",
        field: gmPercentField,
        cellStyle: (params) => getCellStyle(params.value), // Apply dynamic styles
      },
    ],
  });

  const columnDefs = [
    { headerName: "Store", field: "store" },
    { headerName: "SKU", field: "sku" },
    {
      headerName: "Feb", // Top-level header (Month)
      children: [
        createWeekColumn(
          "Week 01",
          "salesUnitsWeek1",
          "salesDollarsWeek1",
          "gmDollarsWeek1",
          "gmPercentWeek1"
        ),
        createWeekColumn(
          "Week 02",
          "salesUnitsWeek2",
          "salesDollarsWeek2",
          "gmDollarsWeek2",
          "gmPercentWeek2"
        ),
        createWeekColumn(
          "Week 03",
          "salesUnitsWeek3",
          "salesDollarsWeek3",
          "gmDollarsWeek3",
          "gmPercentWeek3"
        ),
        createWeekColumn(
          "Week 04",
          "salesUnitsWeek4",
          "salesDollarsWeek4",
          "gmDollarsWeek4",
          "gmPercentWeek4"
        ),
      ],
    },
  ];

  // ✅ Function to style "GM Percent" column based on percentage value
  const getCellStyle = (value) => {
    if (!value) return {};

    const percentage =
      typeof value === "string" ? parseFloat(value.replace("%", "")) : value;

    if (isNaN(percentage)) return {};

    if (percentage < 10) return { backgroundColor: "#ff4d4f", color: "#fff" }; // 🔴 Red
    if (percentage < 30) return { backgroundColor: "#ffa940", color: "#000" }; // 🟠 Orange
    if (percentage < 50) return { backgroundColor: "#fadb14", color: "#000" }; // 🟡 Yellow
    return { backgroundColor: "#52c41a", color: "#fff" }; // 🟢 Green
  };

  // ✅ Sample Data for 4 Weeks
  const rowData = [
    {
      store: "Nashville Melody",
      sku: "Jacket",
      salesUnitsWeek1: 200,
      salesDollarsWeek1: 8998,
      gmDollarsWeek1: 8512,
      gmPercentWeek1: "94.60%",
      salesUnitsWeek2: 180,
      salesDollarsWeek2: 7500,
      gmDollarsWeek2: 7000,
      gmPercentWeek2: "92.00%",
      salesUnitsWeek3: 160,
      salesDollarsWeek3: 7200,
      gmDollarsWeek3: 6800,
      gmPercentWeek3: "85.00%",
      salesUnitsWeek4: 140,
      salesDollarsWeek4: 6800,
      gmDollarsWeek4: 6400,
      gmPercentWeek4: "80.00%",
    },
    {
      store: "Chicago Charm",
      sku: "Dress",
      salesUnitsWeek1: 200,
      salesDollarsWeek1: 29998,
      gmDollarsWeek1: 27689.6,
      gmPercentWeek1: "54.30%",
      salesUnitsWeek2: 190,
      salesDollarsWeek2: 27000,
      gmDollarsWeek2: 25000,
      gmPercentWeek2: "55.00%",
      salesUnitsWeek3: 180,
      salesDollarsWeek3: 25000,
      gmDollarsWeek3: 23000,
      gmPercentWeek3: "50.00%",
      salesUnitsWeek4: 170,
      salesDollarsWeek4: 24000,
      gmDollarsWeek4: 22000,
      gmPercentWeek4: "45.00%",
    },
    {
      store: "Urban Outfitters",
      sku: "Shirt",
      salesUnitsWeek1: 199,
      salesDollarsWeek1: 4973.01,
      gmDollarsWeek1: 31.95,
      gmPercentWeek1: "0.60%",
      salesUnitsWeek2: 180,
      salesDollarsWeek2: 4800,
      gmDollarsWeek2: 40,
      gmPercentWeek2: "1.00%",
      salesUnitsWeek3: 170,
      salesDollarsWeek3: 4600,
      gmDollarsWeek3: 80,
      gmPercentWeek3: "1.50%",
      salesUnitsWeek4: 160,
      salesDollarsWeek4: 4500,
      gmDollarsWeek4: 100,
      gmPercentWeek4: "2.00%",
    },
    {
      store: "Retro Sunglasses",
      sku: "Glasses",
      salesUnitsWeek1: 197,
      salesDollarsWeek1: 31518.03,
      gmDollarsWeek1: 12720,
      gmPercentWeek1: "31.80%",
      salesUnitsWeek2: 185,
      salesDollarsWeek2: 30000,
      gmDollarsWeek2: 12000,
      gmPercentWeek2: "40.00%",
      salesUnitsWeek3: 175,
      salesDollarsWeek3: 28000,
      gmDollarsWeek3: 11500,
      gmPercentWeek3: "41.00%",
      salesUnitsWeek4: 165,
      salesDollarsWeek4: 26000,
      gmDollarsWeek4: 11000,
      gmPercentWeek4: "42.00%",
    },
  ];
  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{
          flex: 1, // Makes columns flexible
          minWidth: 150, // Ensures columns don’t shrink too much
          sortable: true, // Enables sorting
          resizable: true, // Allows resizing columns
          filter: true, // Enables filtering
          cellStyle: { padding: "10px" }, // Adds padding inside all cells
        }}
        animateRows={true}
        rowHeight={50}
        headerHeight={50}
        suppressHorizontalScroll={false}
      />
    </div>
  );
};

export default PlanningTable;
