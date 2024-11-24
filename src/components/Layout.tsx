import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/orders', label: 'Orders' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/documents', label: 'Documents' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-amazon-gray-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Globe className="h-8 w-8 text-amazon-orange" />
              <span className="ml-2 text-xl font-bold text-white">CrossWise</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`${
                  isActive(path)
                    ? 'text-amazon-orange'
                    : 'text-gray-300 hover:text-amazon-orange'
                } transition-colors duration-200`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-amazon-gray-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-3 py-2 ${
                  isActive(path)
                    ? 'text-amazon-orange'
                    : 'text-gray-300 hover:text-amazon-orange'
                } transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-amazon-gray-light">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}