import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import { StoreInterface } from "../../types";
import "./dataTable.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface StoreTableProps {
  data: StoreInterface[] | [];
  onDelete: (ID: string) => void;
  onUpdate: (ID: string, field: keyof StoreInterface, value: string) => void;
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

  const columns: (ColDef<StoreInterface, any> | ColGroupDef<StoreInterface>)[] =
    [
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
        headerName: "S.No",
        field: "SeqNo",
        flex: 0.6,
        rowDrag: true,
      },
      {
        headerName: "Store",
        field: "Label",
        editable: true,
        flex: 2,
        onCellValueChanged: (params: any) => {
          onUpdate(params.data.ID, "Label", params.newValue);
        },
      },
      {
        headerName: "City",
        field: "City",
        editable: true,
        flex: 1,
        onCellValueChanged: (params: any) => {
          onUpdate(params.data.ID, "City", params.newValue);
        },
      },
      {
        headerName: "State",
        field: "State",
        editable: true,
        width: 80,
        flex: 4,
        onCellValueChanged: (params: any) => {
          onUpdate(params.data.ID, "State", params.newValue);
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
