import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import ExporterDetailsForm from '../components/documents/ExporterDetailsForm';
import ProductDetailsForm from '../components/documents/ProductDetailsForm';
import DocumentPreview from '../components/documents/DocumentPreview';
import { DocumentGenerationForm, ExporterDetails } from '../types/document';

const documentTypes = [
  'Commercial Invoice',
  'Packing List',
  'Shipping Bill',
  'Letter of Undertaking',
  'Certificate of Origin'
];

export default function Documents() {
  const [formData, setFormData] = useState<DocumentGenerationForm>({
    productDetails: {
      name: '',
      hsCode: '',
      quantity: 1,
      unitPrice: 0,
      destinationCountry: ''
    },
    exporterDetails: {
      iecNumber: '',
      adCode: '',
      gstLut: '',
      companyName: '',
      address: '',
      panNumber: ''
    },
    documentTypes: []
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleDocumentTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      documentTypes: prev.documentTypes.includes(type)
        ? prev.documentTypes.filter(t => t !== type)
        : [...prev.documentTypes, type]
    }));
  };

  const handleGenerateDocuments = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    // In a real application, this would trigger the document download
    console.log('Downloading documents:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Generate Export Documents</h1>
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            All fields are required for document generation
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>
              <ProductDetailsForm
                details={formData.productDetails}
                onChange={(details) => setFormData(prev => ({ ...prev, productDetails: details }))}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Exporter Details</h2>
              <ExporterDetailsForm
                details={formData.exporterDetails}
                onChange={(details) => setFormData(prev => ({ ...prev, exporterDetails: details }))}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Selection</h2>
              <div className="space-y-3">
                {documentTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.documentTypes.includes(type)}
                      onChange={() => handleDocumentTypeChange(type)}
                      className="h-4 w-4 text-amazon-orange focus:ring-amazon-orange border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateDocuments}
              disabled={formData.documentTypes.length === 0}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon-orange hover:bg-amazon-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon-orange disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Documents
            </button>
          </div>

          <div>
            {showPreview && (
              <DocumentPreview
                formData={formData}
                onDownload={handleDownload}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}