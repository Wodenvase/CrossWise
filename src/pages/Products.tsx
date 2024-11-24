import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ProductTable from '../components/products/ProductTable';
import ProductModal from '../components/products/ProductModal';
import ProductFilters from '../components/products/ProductFilters';
import { Product, ProductFormData } from '../types/product';
import { loadProductsFromCSV } from '../utils/csvUtils';

const categories = ['Leather Goods', 'Textiles', 'Electronics', 'Handicrafts'];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load saved products from localStorage
    const savedProducts = localStorage.getItem('savedProducts');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
      setFilteredProducts(parsedProducts);
    }
  }, []);

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.hsCode.includes(query)
    );
    setFilteredProducts(filtered);
  };

  const handleCountryFilter = (country: string) => {
    if (country === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.destinationCountry === country
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCategoryFilter = (category: string) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      totalPrice: formData.price * (1 + (formData.dutyRate / 100))
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    
    // Save to localStorage
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
  };

  const handleEditProduct = (formData: ProductFormData) => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      id: editingProduct.id,
      ...formData,
      totalPrice: formData.price * (1 + (formData.dutyRate / 100))
    };

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? updatedProduct : p
    );

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditingProduct(null);
    
    // Save to localStorage
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
  };

  const handleDelete = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    
    // Save to localStorage
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon-orange hover:bg-amazon-orange-dark"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        <ProductFilters
          onSearch={handleSearch}
          onCountryFilter={handleCountryFilter}
          onCategoryFilter={handleCategoryFilter}
          categories={categories}
        />

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ProductTable
            products={filteredProducts}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialData={editingProduct}
      />
    </div>
  );
}