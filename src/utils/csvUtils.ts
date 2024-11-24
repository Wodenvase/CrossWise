import Papa from 'papaparse';

export interface CSVProduct {
  'Product Name': string;
  'HS Code': string;
  'Duty Rate': number;
  'Category': string;
}

export const loadProductsFromCSV = async (): Promise<CSVProduct[]> => {
  try {
    const response = await fetch('/products.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          resolve(results.data as CSVProduct[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};