import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import "./skuTable.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SkuInterface, SkuTable } from "../../types";

interface SkuTableProps {
  data: SkuInterface[] | [];
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: keyof SkuInterface, value: string) => void;
}
ModuleRegistry.registerModules([AllCommunityModule]);

const SkustoreTable = ({ data, onDelete, onUpdate }: SkuTableProps) => {
  if (data.length == 0) {
    return <p>Loading Table...</p>;
  }

  const columns: (ColDef<SkuInterface, any> | ColGroupDef<SkuInterface>)[] = [
    {
      headerName: "",
      field: "ID",
      cellRenderer: (params: any) => (
        <div className="flex justify-center items-center ">
          <Button
            className="bg-red-500 text-white pb-2 "
            onClick={() => onDelete(params.data.ID)}
          >
            <DeleteIcon sx={{ color: "black" }} />
          </Button>
        </div>
      ),
      flex: 0.3,
    },
    {
      headerName: "SKU",
      field: "Label",
      flex: 2,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.ID, "Label", params.newValue);
      },
      editable: true,
    },
    {
      headerName: "Price",
      field: "Price",
      editable: true,
      flex: 1,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.ID, "Price", params.newValue);
      },
    },
    {
      headerName: "Cost",
      field: "Cost",
      editable: true,
      flex: 3,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.ID, "Cost", params.newValue);
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div
      className="skuTable"
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowHeight={50}
        headerHeight={50}
      />
    </div>
  );
};

export default SkustoreTable;
