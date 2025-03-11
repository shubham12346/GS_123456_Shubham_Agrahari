import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import { Store } from "../types";
import "./table.css";
import { Button } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";

interface StoreTableProps {
  data: Store[] | [];
}
ModuleRegistry.registerModules([AllCommunityModule]);

const StoreTable: React.FC<StoreTableProps> = ({ data }) => {
  console.log("Data:", data);

  // 🔴 Prevent AG Grid from rendering if `columns` is not valid
  if (data.length == 0) {
    return <p>Loading Table...</p>;
  }
  const columns:
    | (ColDef<Store, any> | ColGroupDef<Store>)[]
    | null
    | undefined = [
    {
      headerName: "",
      field: "id",
      cellRenderer: (params: any) => (
        <div className="flex justify-center items-center ">
          <Button
            className="bg-red-500 text-white pb-2 "
            // onClick={() => onDelete(params.data.id)}
          >
            <DeleteIcon sx={{ color: "black" }} />
          </Button>
        </div>
      ),
      flex: 0.3,
    },
    {
      headerName: "S.No",
      field: "id",
      cellRenderer: (params: any) => (
        <div className="flex justify-center items-center">
          {/* Display index number */}
          <Button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              console.log("Deleting row:", params.data.id);
              // onDelete(params.data.id);
            }}
          >
            <DragIndicatorIcon sx={{ color: "black" }} />
          </Button>
          <div>{params?.data?.index}</div>
        </div>
      ),
      flex: 0.6,
    },
    {
      headerName: "Store",
      field: "store",
      editable: true,
      flex: 2,
      onCellValueChanged: (params: any) => {},
      // onUpdate(params.data.id, params.newValue),
    },
    {
      headerName: "City",
      field: "city",
      editable: true,
      flex: 1,
      onCellValueChanged: (params: any) => {},
      // onUpdate(params.data.id, "city", params.newValue),
    },
    {
      headerName: "State",
      field: "state",
      editable: true,
      width: 80,
      onCellValueChanged: (params: any) => {},
      // onUpdate(params.data.id, "state", params.newValue),
    },
    {
      headerName: "",
      editable: true,
      width: 80,
      onCellValueChanged: (params: any) => {},
      // onUpdate(params.data.id, "state", params.newValue),
      flex: 3,
    },
  ];
  return (
    <div className="ag-theme-alpine" style={{ height: "90%", width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        animateRows={true}
        rowHeight={50}
        headerHeight={50}
        theme="legacy"
      />
    </div>
  );
};

export default StoreTable;
