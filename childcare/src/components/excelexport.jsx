import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style-v2';
import { processBatch } from './Api';

const ExportExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const fileName = "ChildCare"

    const exportToExcel = async () => {
        const excelData = await processBatch();
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <>
            <button onClick={(e) => exportToExcel(fileName)} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-red-500 mt-10">Process Batch</button>
        </>
    )
}

export default ExportExcel
