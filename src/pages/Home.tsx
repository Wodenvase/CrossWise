import React from 'react';
import { Globe2, FileCheck, Package2, BarChart3 } from 'lucide-react';
import Chatbot from '../components/chat/Chatbot';

const features = [
  {
    icon: <FileCheck className="h-6 w-6 text-amazon-orange" />,
    title: 'Product Compliance',
    description: 'Automated compliance checks and documentation for hassle-free exports'
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-amazon-orange" />,
    title: 'Duty Estimation',
    description: 'Accurate duty calculations for multiple destinations'
  },
  {
    icon: <Package2 className="h-6 w-6 text-amazon-orange" />,
    title: 'Document Generation',
    description: 'One-click export document generation for smooth customs clearance'
  }
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-amazon-gray-dark sm:text-5xl md:text-6xl">
                  <span className="block">Simplifying</span>
                  <span className="block text-amazon-orange">Cross-Border Selling</span>
                  <span className="block">for Indian SMBs</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your international business with automated compliance, 
                  duty calculations, and document generation.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="/products" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amazon-orange hover:bg-amazon-orange-dark md:py-4 md:text-lg md:px-10">
                      Get Started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-amazon-gray bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Global shipping and logistics"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-amazon-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-amazon-orange font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-amazon-gray-dark sm:text-4xl">
              Everything you need to sell globally
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Comprehensive tools and features to make cross-border trade simple and efficient.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-amazon-gray-light text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-amazon-gray-dark">{feature.title}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}