import { useEffect, useState } from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import SkustoreTable from "./sku/SkustoreTable";
import { useSelector } from "react-redux";
import useExcelData from "../hooks/useExcelData";
import { RootState } from "../store/store";
import { SkuTable } from "../types";

const Sku = () => {
  const { fetchAndStoreExcelData } = useExcelData();
  const skus = useSelector((state: RootState) => state.excel.SKUs);
  const [skuData, setSkuData] = useState<SkuTable[] | []>([]);

  const addNewStore = () => {
    setSkuData([
      ...skuData,
      {
        id: (skuData.length + 1).toString(),
        label: "",
        cost: "",
        price: "",
      },
    ]);
  };

  const onDelete = (id: string) => {
    setSkuData(skuData.filter((store) => store.id !== id));
  };

  const onUpdate = (id: string, field: keyof SkuTable, value: string) => {
    setSkuData((prevData) =>
      prevData.map((store) =>
        store.id === id ? { ...store, [field]: value } : store
      )
    );
  };

  useEffect(() => {
    fetchAndStoreExcelData("../assets/data.xlsx");
  }, []);
  useEffect(() => {
    if (skus.length > 0) {
      console.log("skus", skus);
      let newData = skus.map((item: any) => {
        return {
          id: item?.ID,
          price: item?.Price as string,
          cost: item?.Cost as string,
          label: item?.Label as string,
        };
      });

      setSkuData(newData);
    }
  }, [skus]);

  console.log("skuData::", skuData, "skus", skus);

  return (
    <ContainerWrapper>
      <SkustoreTable data={skuData} onDelete={onDelete} onUpdate={onUpdate} />
      <button
        className="px-2 py-2 bg-red-300 mt-4 rounded "
        onClick={addNewStore}
      >
        NEW STORE
      </button>
    </ContainerWrapper>
  );
};

export default Sku;
