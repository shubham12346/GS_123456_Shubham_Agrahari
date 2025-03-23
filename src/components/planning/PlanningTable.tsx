import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import "./planning.css";
import usePlanningTable from "../../hooks/usePlanningTable";

ModuleRegistry.registerModules([AllCommunityModule]);

const PlanningTable = () => {
  const { columnDefs, rowData } = usePlanningTable();

  if (columnDefs.length === 0 || rowData?.length === 0) {
    return <div>Loading...</div>;
  }

  console.log("First Row Data:", rowData[0]);
  console.log("coldefs:", columnDefs);

  return (
    <div className="planningTable" style={{ height: "80vh", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{ flex: 1, minWidth: 150 }}
        animateRows={true}
        rowHeight={50}
        headerHeight={50}
        suppressHorizontalScroll={false}
      />
    </div>
  );
};

export default PlanningTable;
