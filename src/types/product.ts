export interface Product {
  id: string;
  name: string;
  destinationCountry: string;
  hsCode: string;
  dutyRate: number;
  price: number;
  totalPrice: number;
}

export interface ProductFormData {
  name: string;
  destinationCountry: string;
  hsCode: string;
  price: number;
  dutyRate: number;
}