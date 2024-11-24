import { read, utils } from 'xlsx';

export interface ProductData {
  productName: string;
  hsCode: string;
  dutyRate: number;
  category: string;
}

export const importExcelData = async (file: File): Promise<ProductData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet) as ProductData[];
        
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

export const validateExcelData = (data: ProductData[]): boolean => {
  return data.every(row => 
    row.productName && 
    row.hsCode && 
    typeof row.dutyRate === 'number' &&
    row.category
  );
};