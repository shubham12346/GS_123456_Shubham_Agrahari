import { useEffect } from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import SkustoreTable from "./sku/SkustoreTable";
import { useDispatch, useSelector } from "react-redux";
import useExcelData from "../hooks/useExcelData";
import { RootState } from "../store/store";
import { SkuInterface } from "../types";
import ErrorBoundary from "../common/ErrorBoundary";
import { updateSKUs } from "../store/excelDataSlice";
import { Actions } from "../constant";

const Sku = () => {
  const { fetchAndStoreExcelData } = useExcelData();
  const skus = useSelector((state: RootState) => state.excel.SKUs);
  const dispatch = useDispatch();

  const addNewStore = () => {
    dispatch(
      updateSKUs({
        type: Actions.Add,
        data: {
          Id: (skus.length + 1).toString(),
          Label: "",
          Cost: "",
          Price: "",
        },
      })
    );
  };

  const onDelete = (ID: string) => {
    dispatch(updateSKUs({ type: Actions.Delete, data: ID }));
  };

  const onUpdate = (ID: string, field: keyof SkuInterface, value: string) => {
    console.log("ID", ID, "field", field, "value", value);
    dispatch(updateSKUs({ type: Actions.Update, data: { ID, field, value } }));
  };

  useEffect(() => {
    if (skus.length === 0) {
      fetchAndStoreExcelData("../assets/data.xlsx");
    }
  }, [skus]);

  return (
    <ErrorBoundary>
      <ContainerWrapper>
        <SkustoreTable
          data={skus.map((sku) => ({ ...sku }))}
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

export default Sku;
