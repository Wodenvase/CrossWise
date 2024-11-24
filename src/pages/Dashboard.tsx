import React from 'react';
import { Package, Globe, Percent, FileCheck, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import StatsCard from '../components/dashboard/StatsCard';

const dutyData = [
  { country: 'USA', value: 8 },
  { country: 'EU', value: 12 },
  { country: 'UK', value: 10 },
  { country: 'Japan', value: 11 },
  { country: 'Australia', value: 9 }
];

const complianceData = [
  { name: 'Compliant', value: 85 },
  { name: 'Pending', value: 10 },
  { name: 'Issues', value: 5 }
];

const COLORS = ['#FF9900', '#FFB444', '#E88B00'];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Seller Dashboard</h1>
          <div className="space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon-orange hover:bg-amazon-orange-dark">
              <Package className="h-4 w-4 mr-2" />
              Add New Product
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FileCheck className="h-4 w-4 mr-2" />
              Generate Documents
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value="124"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Countries Served"
            value="7"
            icon={Globe}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Average Duty Rate"
            value="9.8%"
            icon={Percent}
          />
          <StatsCard
            title="Compliance Score"
            value="85%"
            icon={FileCheck}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Duty Rates by Destination</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dutyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FF9900" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Compliance Overview</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={complianceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6">
                {complianceData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}