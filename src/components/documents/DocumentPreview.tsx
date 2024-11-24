import React from 'react';
import { FileText, Download } from 'lucide-react';
import { DocumentGenerationForm } from '../../types/document';

interface DocumentPreviewProps {
  formData: DocumentGenerationForm;
  onDownload: () => void;
}

export default function DocumentPreview({ formData, onDownload }: DocumentPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-amazon-orange mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Document Preview</h3>
          </div>
          <button
            onClick={onDownload}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-amazon-orange bg-amazon-orange/10 hover:bg-amazon-orange/20"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {formData.documentTypes.map((docType) => (
          <div key={docType} className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">{docType}</h4>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Exporter Details:</p>
                  <p>{formData.exporterDetails.companyName}</p>
                  <p>{formData.exporterDetails.address}</p>
                  <p>IEC: {formData.exporterDetails.iecNumber}</p>
                </div>
                <div>
                  <p className="font-medium">Product Details:</p>
                  <p>{formData.productDetails.name}</p>
                  <p>HS Code: {formData.productDetails.hsCode}</p>
                  <p>Quantity: {formData.productDetails.quantity}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium">Declaration:</p>
                <p className="text-xs">
                  We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}