import React from 'react';
import { Search } from 'lucide-react';

interface ProductFiltersProps {
  onSearch: (query: string) => void;
  onCountryFilter: (country: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
}

const countries = ['All', 'USA', 'UK', 'EU', 'Canada', 'Australia', 'Japan', 'Singapore'];

export default function ProductFilters({ onSearch, onCountryFilter, onCategoryFilter, categories }: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amazon-orange focus:border-amazon-orange sm:text-sm"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="sm:w-48">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange sm:text-sm rounded-md"
          onChange={(e) => onCountryFilter(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:w-48">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amazon-orange focus:border-amazon-orange sm:text-sm rounded-md"
          onChange={(e) => onCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}