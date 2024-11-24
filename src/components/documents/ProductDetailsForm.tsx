import React from 'react';

interface ProductDetails {
  name: string;
  hsCode: string;
  quantity: number;
  unitPrice: number;
  destinationCountry: string;
}

interface ProductDetailsFormProps {
  details: ProductDetails;
  onChange: (details: ProductDetails) => void;
}

const countries = ['USA', 'UK', 'EU', 'Canada', 'Australia', 'Japan', 'Singapore'];

export default function ProductDetailsForm({ details, onChange }: ProductDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={details.name}
          onChange={(e) => onChange({ ...details, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">HS Code</label>
          <input
            type="text"
            value={details.hsCode}
            onChange={(e) => onChange({ ...details, hsCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 6204.43"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Destination Country</label>
          <select
            value={details.destinationCountry}
            onChange={(e) => onChange({ ...details, destinationCountry: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            min="1"
            value={details.quantity}
            onChange={(e) => onChange({ ...details, quantity: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Price (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={details.unitPrice}
            onChange={(e) => onChange({ ...details, unitPrice: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}