export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  dutyRate: number;
  dutyAmount: number;
  total: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  totalDuty: number;
  total: number;
  shippingTerms: 'DAP' | 'DDP';
  status: 'pending' | 'processing' | 'completed';
}