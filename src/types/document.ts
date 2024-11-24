export interface ExporterDetails {
  iecNumber: string;
  adCode: string;
  gstLut: string;
  companyName: string;
  address: string;
  panNumber: string;
}

export interface DocumentGenerationForm {
  productDetails: {
    name: string;
    hsCode: string;
    quantity: number;
    unitPrice: number;
    destinationCountry: string;
  };
  exporterDetails: ExporterDetails;
  documentTypes: string[];
}