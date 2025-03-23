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
import { SkuTable } from "../../types";

interface SkuTableProps {
  data: SkuTable[] | [];
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: keyof SkuTable, value: string) => void;
}
ModuleRegistry.registerModules([AllCommunityModule]);

const SkustoreTable = ({ data, onDelete, onUpdate }: SkuTableProps) => {
  if (data.length == 0) {
    return <p>Loading Table...</p>;
  }

  console.log("data", data);
  const columns: (ColDef<SkuTable, any> | ColGroupDef<SkuTable>)[] = [
    {
      headerName: "",
      field: "id",
      cellRenderer: (params: any) => (
        <div className="flex justify-center items-center ">
          <Button
            className="bg-red-500 text-white pb-2 "
            onClick={() => onDelete(params.data.id)}
          >
            <DeleteIcon sx={{ color: "black" }} />
          </Button>
        </div>
      ),
      flex: 0.3,
    },
    {
      headerName: "SKU",
      field: "label",
      flex: 2,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.id, "label", params.newValue);
      },
      editable: true,
    },
    {
      headerName: "Price",
      field: "price",
      editable: true,
      flex: 1,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.id, "price", params.newValue);
      },
    },
    {
      headerName: "Cost",
      field: "cost",
      editable: true,
      flex: 3,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.id, "cost", params.newValue);
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
        height: "80vh",
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
