import { useDispatch, useSelector } from "react-redux";
import { setExcelData } from "../store/excelDataSlice";
import * as XLSX from "xlsx";
import { ExcelData } from "../types";
import { RootState } from "../store/store";

const useExcelData = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.excel.Stores);
  const fetchAndStoreExcelData = async (filePath: string) => {
    if (stores.length >= 1) {
      console.log("Data already exists in Redux, skipping fetch");
      return;
    }
    try {
      console.log("Fetching file from:", filePath);
      const response = await fetch(filePath);
      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      console.log("Blob created:", blob);

      const reader = new FileReader();

      reader.onload = (e) => {
        console.log("FileReader onload triggered");
        if (!e.target?.result) {
          console.error("No result found in FileReader");
          return;
        }

        const arrayBuffer = e.target.result as ArrayBuffer;
        console.log("ArrayBuffer loaded:", arrayBuffer);

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        console.log("Workbook read:", workbook);

        const extractedData: ExcelData = {};
        workbook.SheetNames.forEach((sheetName) => {
          console.log("Processing sheet:", sheetName);
          const worksheet = workbook.Sheets[sheetName];
          extractedData[sheetName] = XLSX.utils.sheet_to_json(worksheet);
        });

        console.log("Final extracted data:", extractedData);
        dispatch(setExcelData({ ...extractedData }));
      };

      reader.onerror = () => {
        console.error("Error reading Excel file");
      };

      reader?.readAsArrayBuffer(blob);
      console.log("FileReader started reading blob");
    } catch (error) {
      console.error("Error loading Excel file:", error);
    }
  };
  return { fetchAndStoreExcelData };
};

export default useExcelData;
