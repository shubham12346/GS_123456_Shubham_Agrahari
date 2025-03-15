import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import { Store } from "../../types";
import "./dataTable.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface StoreTableProps {
  data: Store[] | [];
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: keyof Store, value: string) => void;
}

ModuleRegistry.registerModules([AllCommunityModule]);

const StoreTable: React.FC<StoreTableProps> = ({
  data,
  onDelete,
  onUpdate,
}) => {
  if (data.length == 0) {
    return <p>Loading Table...</p>;
  }

  const columns: (ColDef<Store, any> | ColGroupDef<Store>)[] = [
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
      headerName: "S.No",
      field: "id",
      cellRenderer: (params: any) => (
        <div className="flex justify-center items-center">
          <div>{params?.data?.index}</div>
        </div>
      ),
      flex: 0.6,
      rowDrag: true,
    },
    {
      headerName: "Store",
      field: "store",
      editable: true,
      flex: 2,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.id, "store", params.newValue);
      },
    },
    {
      headerName: "City",
      field: "city",
      editable: true,
      flex: 1,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.id, "city", params.newValue);
      },
    },
    {
      headerName: "State",
      field: "state",
      editable: true,
      width: 80,
      flex: 4,
      onCellValueChanged: (params: any) => {
        onUpdate(params.data.id, "state", params.newValue);
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowHeight={50}
        headerHeight={50}
        rowDragManaged={true}
      />
    </div>
  );
};

export default StoreTable;
