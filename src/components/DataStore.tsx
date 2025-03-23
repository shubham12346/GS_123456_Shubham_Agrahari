import { useEffect, useState } from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import { useSelector } from "react-redux";
import useExcelData from "../hooks/useExcelData";
import { RootState } from "../store/store";
import StoreTable from "./datastore/DataStoreTable";
import { Store } from "../types";
import ErrorBoundary from "../common/ErrorBoundary";

const DataStore = () => {
  const { fetchAndStoreExcelData } = useExcelData();
  const Stores = useSelector((state: RootState) => state.excel.Stores);
  const Planning = useSelector((state: RootState) => state.excel.Planning);
  console.log("planningData", Planning);
  const [storeData, setStoreData] = useState<Store[] | []>([]);

  const addNewStore = () => {
    setStoreData([
      ...storeData,
      {
        id: (storeData.length + 1).toString(),
        index: storeData.length + 1,
        store: "",
        city: "",
        state: "",
      },
    ]);
  };

  const onDelete = (id: string) => {
    setStoreData(storeData.filter((store) => store.id !== id));
  };

  const onUpdate = (id: string, field: keyof Store, value: string) => {
    setStoreData((prevData) =>
      prevData.map((store) =>
        store.id === id ? { ...store, [field]: value } : store
      )
    );
  };

  useEffect(() => {
    if (Stores.length > 0) {
      let newData = Stores.map((item, index) => {
        return {
          id: item?.ID as string,
          store: item?.Label as string,
          state: item?.State as string,
          city: item?.City as string,
          index: index,
        };
      });

      setStoreData(newData);
    }
  }, [Stores]);

  useEffect(() => {
    fetchAndStoreExcelData("../assets/data.xlsx");
  }, []);

  return (
    <ErrorBoundary>
      <ContainerWrapper>
        <StoreTable data={storeData} onDelete={onDelete} onUpdate={onUpdate} />
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
