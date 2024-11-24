import React from 'react';
import { HelpCircle } from 'lucide-react';
import { OrderItem } from '../../types/order';

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  totalDuty: number;
  total: number;
  shippingTerms: 'DAP' | 'DDP';
}

export default function OrderSummary({ items, subtotal, totalDuty, total, shippingTerms }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p>₹{item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Duty: {item.dutyRate}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="flex items-center">
            Estimated Duty
            <div className="group relative ml-1">
              <HelpCircle className="h-4 w-4 text-gray-400" />
              <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-xs rounded">
                Estimated import duties based on current rates. Final amount may vary.
              </div>
            </div>
          </span>
          <span>₹{totalDuty.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total ({shippingTerms})</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-amazon-orange text-white py-2 px-4 rounded hover:bg-amazon-orange-dark transition-colors">
        Proceed to Checkout
      </button>

      <p className="mt-4 text-sm text-gray-500 text-center">
        {shippingTerms === 'DDP' ? 
          'Price includes all duties and taxes' : 
          'Additional duties and taxes may be collected upon delivery'}
      </p>
    </div>
  );
}