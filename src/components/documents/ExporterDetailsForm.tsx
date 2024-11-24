import React from 'react';
import { ExporterDetails } from '../../types/document';

interface ExporterDetailsFormProps {
  details: ExporterDetails;
  onChange: (details: ExporterDetails) => void;
}

export default function ExporterDetailsForm({ details, onChange }: ExporterDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">IEC Number</label>
          <input
            type="text"
            value={details.iecNumber}
            onChange={(e) => onChange({ ...details, iecNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="0123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">AD Code</label>
          <input
            type="text"
            value={details.adCode}
            onChange={(e) => onChange({ ...details, adCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="AD123456"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GST LUT Number</label>
        <input
          type="text"
          value={details.gstLut}
          onChange={(e) => onChange({ ...details, gstLut: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="LUT/GST/2023-24/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          value={details.companyName}
          onChange={(e) => onChange({ ...details, companyName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Address</label>
        <textarea
          value={details.address}
          onChange={(e) => onChange({ ...details, address: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">PAN Number</label>
        <input
          type="text"
          value={details.panNumber}
          onChange={(e) => onChange({ ...details, panNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="ABCDE1234F"
        />
      </div>
    </div>
  );
}