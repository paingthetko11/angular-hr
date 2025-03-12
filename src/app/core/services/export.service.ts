import { ElementRef, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Nullable } from 'primeng/ts-helpers';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public excel(fileName: string, element: Nullable<ElementRef>): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.table_to_sheet(element?.nativeElement);
      var range = xlsx.utils.decode_range(worksheet['!ref'] as string);
      for (var C = range.s.r; C <= range.e.c; ++C) {
        var address = xlsx.utils.encode_col(C) + '1'; // <-- first row, column number C
        if (!worksheet[address]) continue;
        worksheet[address].v = worksheet[address].v.toUpperCase();
      }
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, fileName + new Date().toLocaleDateString() + EXCEL_EXTENSION);
  }
}
