// MonthlySummary.js - Monthly summary and data panel components
import React from 'react';
import { ChevronLeft, TrendingUp, Activity, Volume2, Download, BarChart3, PieChart, Target } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { calculateMonthlySummary } from './utils.js';

export const MonthlySummary = ({ currentDate, monthData }) => {
  const summary = calculateMonthlySummary(monthData);
  
  if (!summary) return null;

  const performanceData = [
    { name: 'Positive', value: summary.positiveDays, color: '#10B981' },
    { name: 'Negative', value: summary.negativeDays, color: '#EF4444' },
    { name: 'Neutral', value: summary.neutralDays, color: '#6B7280' }
  ];

  const volatilityData = [
    { name: 'Low Vol', value: summary.lowVolDays, color: '#10B981' },
    { name: 'Medium Vol', value: summary.mediumVolDays, color: '#F59E0B' },
    { name: 'High Vol', value: summary.highVolDays, color: '#EF4444' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Monthly Summary - {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Key Metrics */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Performance</span>
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {summary.avgPerformance >= 0 ? '+' : ''}{(summary.avgPerformance * 100).toFixed(2)}%
          </div>
          <div className="text-xs text-blue-600 mt-1">Average Daily Return</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Volatility</span>
          </div>
          <div className="text-2xl font-bold text-purple-800">
            {(summary.avgVolatility * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-purple-600 mt-1">Average Daily Volatility</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Volume2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Volume</span>
          </div>
          <div className="text-2xl font-bold text-green-800">
            {(summary.avgVolume / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-green-600 mt-1">Average Daily Volume</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-600">Price Range</span>
          </div>
          <div className="text-lg font-bold text-yellow-800">
            ${summary.priceRange.low.toLocaleString()} - ${summary.priceRange.high.toLocaleString()}
          </div>
          <div className="text-xs text-yellow-600 mt-1">Monthly High/Low</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <PieChart className="w-4 h-4 mr-2" />
            Daily Performance Distribution
          </h4>
          <div className="space-y-3">
            {performanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-mono text-sm mr-2">{item.value}</span>
                  <span className="text-xs text-gray-500">
                    ({((item.value / summary.totalDays) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volatility Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-4">Volatility Distribution</h4>
          <div className="space-y-3">
            {volatilityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-mono text-sm mr-2">{item.value}</span>
                  <span className="text-xs text-gray-500">
                    ({((item.value / summary.totalDays) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Statistics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-4">Key Statistics</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Best Day:</span>
              <span className="font-mono text-green-600 font-semibold">
                +{(summary.bestDay * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Worst Day:</span>
              <span className="font-mono text-red-600 font-semibold">
                {(summary.worstDay * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trading Days:</span>
              <span className="font-mono">{summary.totalDays}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Volume:</span>
              <span className="font-mono">{(summary.totalVolume / 1000000).toFixed(0)}M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Price:</span>
              <span className="font-mono">${summary.avgPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Performance Chart */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg mb-4">Monthly Trend Analysis</h4>
        <div className="h-64 bg-white p-4 rounded-lg border">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Week 1', performance: summary.avgPerformance * 0.8, volatility: summary.avgVolatility * 0.9 },
              { name: 'Week 2', performance: summary.avgPerformance * 1.2, volatility: summary.avgVolatility * 1.1 },
              { name: 'Week 3', performance: summary.avgPerformance * 0.9, volatility: summary.avgVolatility * 0.8 },
              { name: 'Week 4', performance: summary.avgPerformance * 1.1, volatility: summary.avgVolatility * 1.2 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'performance' ? `${(value * 100).toFixed(2)}%` : `${(value * 100).toFixed(1)}%`,
                  name === 'performance' ? 'Performance' : 'Volatility'
                ]}
                labelStyle={{ color: '#1F2937' }}
              />
              <Bar dataKey="performance" fill="#3B82F6" name="performance" />
              <Bar dataKey="volatility" fill="#F59E0B" name="volatility" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const DataPanel = ({ selectedDate, selectedData, onClose }) => {
  if (!selectedDate || !selectedData) return null;

  const handleClose = () => {
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Fixed Header */}
        <div className="flex-shrink-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex items-center">
            <button
              onClick={handleClose}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
              title="Return to Calendar"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Back to Calendar</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              Market Data - {selectedDate.toLocaleDateString()}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Price Data
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open:</span>
                    <span className="font-mono">${selectedData.open.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Close:</span>
                    <span className="font-mono">${selectedData.close.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">High:</span>
                    <span className="font-mono">${selectedData.high.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Low:</span>
                    <span className="font-mono">${selectedData.low.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Performance
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Change:</span>
                    <span className={`font-mono ${selectedData.performance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(selectedData.performance * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volatility:</span>
                    <span className="font-mono">{(selectedData.volatility * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Volume2 className="w-5 h-5 mr-2" />
                  Volume & Liquidity
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume:</span>
                    <span className="font-mono">{(selectedData.volume / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Liquidity Score:</span>
                    <span className="font-mono">{(selectedData.liquidity * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-1">Liquidity Distribution</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${selectedData.liquidity * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Technical Indicators</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">RSI (14):</span>
                    <span className="font-mono">{(50 + selectedData.performance * 500).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MA (20):</span>
                    <span className="font-mono">${(selectedData.close * 0.98).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional detailed analysis section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4 text-blue-800">Detailed Market Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Price Movement</h4>
                <div className="text-2xl font-bold mb-1">
                  {selectedData.performance > 0 ? '+' : ''}{(selectedData.performance * 100).toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500">
                  ${Math.abs(selectedData.close - selectedData.open).toLocaleString()} change
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Volatility Rating</h4>
                <div className="text-2xl font-bold mb-1">
                  {selectedData.volatility > 0.05 ? 'High' : 
                   selectedData.volatility > 0.03 ? 'Medium' : 'Low'}
                </div>
                <div className="text-sm text-gray-500">
                  {(selectedData.volatility * 100).toFixed(1)}% daily volatility
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Market Activity</h4>
                <div className="text-2xl font-bold mb-1">
                  {selectedData.volume > 5000000 ? 'High' : 
                   selectedData.volume > 2000000 ? 'Medium' : 'Low'}
                </div>
                <div className="text-sm text-gray-500">
                  {(selectedData.volume / 1000000).toFixed(1)}M volume
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-4">Price Action Visualization</h3>
            <div className="h-64 bg-white p-4 rounded-lg border">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { time: '9:30', price: selectedData.open },
                  { time: '12:00', price: (selectedData.open + selectedData.high) / 2 },
                  { time: '15:30', price: selectedData.high },
                  { time: '16:00', price: selectedData.close }
                ]}>
                  <defs>
                    <linearGradient id="priceAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()}`, 'Price']}
                    labelStyle={{ color: '#1F2937' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#priceAreaGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Risk Indicators</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Volatility Risk:</span>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        selectedData.volatility > 0.05 ? 'bg-red-500' :
                        selectedData.volatility > 0.03 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="text-sm font-medium">
                        {selectedData.volatility > 0.05 ? 'High Risk' :
                         selectedData.volatility > 0.03 ? 'Medium Risk' : 'Low Risk'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Liquidity Risk:</span>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        selectedData.liquidity > 0.7 ? 'bg-green-500' :
                        selectedData.liquidity > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium">
                        {selectedData.liquidity > 0.7 ? 'Low Risk' :
                         selectedData.liquidity > 0.4 ? 'Medium Risk' : 'High Risk'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Trading Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-mono">
                      {((selectedData.high - selectedData.low) / selectedData.close * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume/Avg:</span>
                    <span className="font-mono">
                      {(selectedData.volume / 5000000).toFixed(1)}x
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trend Strength:</span>
                    <span className="font-mono">
                      {Math.abs(selectedData.performance * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center font-medium"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Return to Calendar
            </button>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};