import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const usePlanningTable = () => {
  const { Stores, Calendar, SKUs, Planning, Calculations } = useSelector(
    (state: RootState) => state.excel
  );

  const planningMap = useMemo(() => {
    return new Map(
      Planning?.map((p: any) => [`${p.Store}_${p.SKU}_${p.Week}`, p])
    );
  }, [Planning]);
  const calculationsMap = useMemo(() => {
    return new Map(
      Calculations?.map((c: any) => [`${c.Store}_${c.SKU}_${c.Week}`, c])
    );
  }, [Calculations]);

  const storeMap = useMemo(() => {
    return new Map(Stores.map((store) => [store["ID"], store["Label"]]));
  }, [Stores]);

  const skuMap = useMemo(() => {
    return new Map(SKUs.map((sku) => [sku["ID"], sku["Label"]]));
  }, [SKUs]);

  const rowData = useMemo(() => {
    if (!Planning || !calculationsMap) return [];

    // Create a Map to group data by Store + SKU
    const groupedData = new Map();

    Planning.forEach((entry: any) => {
      const storeID = entry.Store;
      const skuID = entry.SKU;
      const week = entry.Week;
      const key = `${storeID}_${skuID}`;

      // If this store-SKU combination does not exist, initialize it
      if (!groupedData.has(key)) {
        groupedData.set(key, {
          store: storeMap.get(storeID) ?? storeID,
          sku: skuMap.get(skuID) ?? skuID,
        });
      }

      // Get the existing row object
      const row = groupedData.get(key);

      // Fill data for the specific week
      row[`salesUnits_${week}`] =
        calculationsMap.get(`${storeID}_${skuID}_${week}`)?.["Sales Units"] ??
        0;
      row[`salesDollars_${week}`] =
        calculationsMap.get(`${storeID}_${skuID}_${week}`)?.["Sales Dollars"] ??
        0;
      row[`gmDollars_${week}`] =
        calculationsMap.get(`${storeID}_${skuID}_${week}`)?.["GM Dollars"] ?? 0;
      row[`gmPercent_${week}`] =
        calculationsMap.get(`${storeID}_${skuID}_${week}`)?.["GM %"] ?? "0";
    });

    return Array.from(groupedData.values());
  }, [Planning, calculationsMap]);

  const columnDefs = useMemo(() => {
    if (!Calendar) return [];

    // Define base columns
    const columns = [
      { headerName: "Store", field: "store", flex: 4 },
      { headerName: "SKU", field: "sku", flex: 4 },
    ];

    // Group weeks under their respective months
    const monthGroups = new Map();

    Calendar.forEach((week: any) => {
      const monthLabel = week["Month Label"];
      const weekLabel = week["Week Label"];
      const weekField = week.Week; // e.g., W01, W02...

      if (!monthGroups.has(monthLabel)) {
        monthGroups.set(monthLabel, { headerName: monthLabel, children: [] });
      }

      const weekGroup = {
        headerName: weekLabel,
        children: [
          {
            headerName: "Sales Units",
            field: `salesUnits_${weekField}`,
            valueGetter: (params: any) =>
              params.data?.[`salesUnits_${weekField}`] ?? 0,
            editable: true,
          },
          {
            headerName: "Sales Dollars",
            field: `salesDollars_${weekField}`,
            valueGetter: (params: any) =>
              params.data?.[`salesDollars_${weekField}`] ?? 0,
          },
          {
            headerName: "GM Dollars",
            field: `gmDollars_${weekField}`,
            valueGetter: (params: any) =>
              params.data?.[`gmDollars_${weekField}`] ?? 0,
          },
          {
            headerName: "GM %",
            field: `gmPercent_${weekField}`,
            valueGetter: (params: any) =>
              Number(params.data?.[`gmPercent_${weekField}`]) * 100,
            cellStyle: (params: any) => {
              const rawValue = params?.value ?? "0"; // Ensure `params.value` is never undefined/null
              const numericValue =
                typeof rawValue === "string"
                  ? parseFloat(rawValue.replace("%", ""))
                  : rawValue; // Convert string to number only if needed
              if (isNaN(numericValue)) return {}; // Avoid invalid styles
              let multiplyNum = Number(numericValue) * 100;

              if (multiplyNum >= 40)
                return { backgroundColor: "#52c41a", color: "#fff" };
              if (multiplyNum >= 10)
                return { backgroundColor: "#fadb14", color: "#000" };
              if (multiplyNum > 5)
                return { backgroundColor: "#ffa940", color: "#000" };
              return { backgroundColor: "#ff4d4f", color: "#fff" };
            },
          },
        ],
      };

      monthGroups.get(monthLabel).children.push(weekGroup);
    });

    return [...columns, ...Array.from(monthGroups.values())];
  }, [Calendar]);

  return { columnDefs, rowData };
};

export default usePlanningTable;
