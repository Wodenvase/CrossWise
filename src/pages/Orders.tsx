import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import OrderSummary from '../components/orders/OrderSummary';
import { Order, OrderItem } from '../types/order';
import { loadProductsFromCSV, CSVProduct } from '../utils/csvUtils';
import { Product } from '../types/product';

export default function Orders() {
  const [products, setProducts] = useState<CSVProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<Order>({
    id: '1',
    items: [],
    subtotal: 0,
    totalDuty: 0,
    total: 0,
    shippingTerms: 'DDP',
    status: 'pending'
  });

  useEffect(() => {
    const loadData = async () => {
      const csvProducts = await loadProductsFromCSV();
      setProducts(csvProducts);
      
      // Load saved products from localStorage
      const saved = localStorage.getItem('savedProducts');
      if (saved) {
        setSavedProducts(JSON.parse(saved));
      }
    };
    loadData();
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const updatedItems = order.items.map(item => {
      if (item.id === id) {
        const dutyAmount = (item.price * quantity * item.dutyRate) / 100;
        const total = (item.price * quantity) + dutyAmount;
        return { ...item, quantity, dutyAmount, total };
      }
      return item;
    });

    updateOrderTotals(updatedItems);
  };

  const updateOrderTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDuty = items.reduce((sum, item) => sum + item.dutyAmount, 0);
    const total = subtotal + totalDuty;
    setOrder({ ...order, items, subtotal, totalDuty, total });
  };

  const addProduct = () => {
    const savedProduct = savedProducts.find(p => p.name === selectedProduct);
    const csvProduct = products.find(p => p['Product Name'] === selectedProduct);
    
    if (!savedProduct || !csvProduct) return;

    const price = savedProduct.price;
    const dutyRate = csvProduct['Duty Rate'];
    const dutyAmount = (price * quantity * dutyRate) / 100;
    const total = (price * quantity) + dutyAmount;

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: savedProduct.name,
      quantity,
      price,
      dutyRate,
      dutyAmount,
      total
    };

    const updatedItems = [...order.items, newItem];
    updateOrderTotals(updatedItems);
    setSelectedProduct('');
    setQuantity(1);
  };

  const updateShippingTerms = (terms: 'DAP' | 'DDP') => {
    setOrder({ ...order, shippingTerms: terms });
  };

  const removeItem = (id: string) => {
    const updatedItems = order.items.filter(item => item.id !== id);
    updateOrderTotals(updatedItems);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Order Details</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Add Product</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Product</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
                  >
                    <option value="">Select a product</option>
                    {savedProducts.map((product, index) => (
                      <option key={index} value={product.name}>
                        {product.name} - {product.hsCode} (₹{product.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={addProduct}
                      disabled={!selectedProduct}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon-orange hover:bg-amazon-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon-orange disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Terms</label>
                  <select 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
                    value={order.shippingTerms}
                    onChange={(e) => updateShippingTerms(e.target.value as 'DAP' | 'DDP')}
                  >
                    <option value="DDP">Delivered Duty Paid (DDP)</option>
                    <option value="DAP">Delivered At Place (DAP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                  <textarea 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Duty Rate: {item.dutyRate}%</p>
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazon-orange focus:ring-amazon-orange sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {order.items.length === 0 && (
                <p className="text-gray-500 text-center">No items added yet</p>
              )}
            </div>
          </div>

          <div>
            <OrderSummary
              items={order.items}
              subtotal={order.subtotal}
              totalDuty={order.totalDuty}
              total={order.total}
              shippingTerms={order.shippingTerms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}