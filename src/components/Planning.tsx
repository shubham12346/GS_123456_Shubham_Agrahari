import { useSelector } from "react-redux";
import ContainerWrapper from "../common/ContainerWrapper";
import useExcelData from "../hooks/useExcelData";
import { RootState } from "../store/store";
import PlanningTable from "./planning/PlanningTable";
import { useEffect } from "react";
import ErrorBoundary from "../common/ErrorBoundary";

const Planning = () => {
  const { fetchAndStoreExcelData } = useExcelData();

  const Planning = useSelector((state: RootState) => state.excel.Planning);

  useEffect(() => {
    if (Planning.length == 0) {
      fetchAndStoreExcelData("../assets/data.xlsx");
    }
  }, []);

  if (Planning.length == 0) {
    return <p>Loading Table...</p>;
  }

  return (
    <ErrorBoundary>
      <ContainerWrapper>
        <PlanningTable />
      </ContainerWrapper>
    </ErrorBoundary>
  );
};

export default Planning;
