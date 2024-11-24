import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { importExcelData, validateExcelData, ProductData } from '../../utils/excelUtils';

interface ExcelUploaderProps {
  onDataImport: (data: ProductData[]) => void;
}

export default function ExcelUploader({ onDataImport }: ExcelUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await importExcelData(file);
      if (validateExcelData(data)) {
        onDataImport(data);
      } else {
        alert('Invalid Excel format. Please ensure all required fields are present.');
      }
    } catch (error) {
      console.error('Error importing Excel data:', error);
      alert('Error importing Excel data. Please check the file format.');
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon-orange hover:bg-amazon-orange-dark"
      >
        <Upload className="h-5 w-5 mr-2" />
        Import Excel Data
      </button>
    </div>
  );
}