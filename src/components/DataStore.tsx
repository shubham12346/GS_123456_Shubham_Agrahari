import { useEffect } from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import { useDispatch, useSelector } from "react-redux";
import useExcelData from "../hooks/useExcelData";
import { RootState } from "../store/store";
import StoreTable from "./datastore/DataStoreTable";
import { StoreInterface } from "../types";
import ErrorBoundary from "../common/ErrorBoundary";
import { updateStores } from "../store/excelDataSlice";
import { Actions } from "../constant";

const DataStore = () => {
  const { fetchAndStoreExcelData } = useExcelData();
  const Stores = useSelector((state: RootState) => state.excel.Stores);
  const dispatch = useDispatch();

  const addNewStore = () => {
    dispatch(
      updateStores({
        type: Actions.Add,
        data: {
          ID: (Stores.length + 1).toString(),
          Label: "",
          City: "",
          State: "",
          "Seq No.": Stores.length + 1,
          SeqNo: Stores.length + 1,
        },
      })
    );
  };

  const onDelete = (ID: string) => {
    dispatch(updateStores({ type: Actions.Delete, data: { ID } }));
  };

  const onUpdate = (ID: string, field: keyof StoreInterface, value: string) => {
    console.log("ID", ID, "field", field, "value", value);
    dispatch(
      updateStores({ type: Actions.Update, data: { ID, field, value } })
    );
  };

  useEffect(() => {
    if (Stores.length === 0) {
      fetchAndStoreExcelData("../assets/data.xlsx");
    }
  }, []);

  return (
    <ErrorBoundary>
      <ContainerWrapper>
        <StoreTable
          data={Stores.map((row) => ({ ...row }))}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
        <button
          className="px-2 py-2 bg-red-300 mt-4 rounded "
          onClick={addNewStore}
        >
          NEW STORE
        </button>
      </ContainerWrapper>
    </ErrorBoundary>
  );
};

export default DataStore;
