import * as XLSX from "xlsx";

const useExcel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportExcel = (data: any[], fileName: string) => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      throw new Error("Failed to export data to Excel: " + error);
    }
  };

  return { exportExcel };
};
export default useExcel;
