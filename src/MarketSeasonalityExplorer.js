// MarketSeasonalityExplorer.js - Main application component
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Settings } from 'lucide-react';
import { generateMockData } from './utils.js';
import { 
  CalendarTooltip, 
  CalendarGrid, 
  RealTimeGraph, 
  LegendPanel 
} from './components.js';
import { MonthlySummary, DataPanel } from './MonthlySummary.js';

const MarketSeasonalityExplorer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [tooltipData, setTooltipData] = useState({ date: null, data: null, position: null });
  const [monthData, setMonthData] = useState({});

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateSelect = useCallback((date, data) => {
    setSelectedDate(date);
    setSelectedData(data);
    setShowPanel(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setShowPanel(false);
    setSelectedDate(null);
    setSelectedData(null);
  }, []);

  const handleHover = useCallback((date, data, position) => {
    setTooltipData({ date, data, position });
  }, []);

  const handleHoverEnd = useCallback(() => {
    setTooltipData({ date: null, data: null, position: null });
  }, []);

  const handleKeyDown = useCallback((e) => {
    switch(e.key) {
      case 'ArrowLeft':
        navigateMonth(-1);
        break;
      case 'ArrowRight':
        navigateMonth(1);
        break;
      case 'Escape':
        setShowPanel(false);
        setTooltipData({ date: null, data: null, position: null });
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    // Generate month data when currentDate changes
    const data = {};
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      data[day] = generateMockData(date);
    }
    setMonthData(data);
  }, [currentDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Market Seasonality Explorer</h1>
              <p className="text-gray-600">Interactive calendar for visualizing financial market data</p>
            </div>
            
            <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
              <select 
                value={view} 
                onChange={(e) => setView(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily View</option>
                <option value="weekly">Weekly View</option>
                <option value="monthly">Monthly View</option>
              </select>
              
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Graph */}
        <RealTimeGraph />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <CalendarGrid
                currentDate={currentDate}
                view={view}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                onHover={handleHover}
                onHoverEnd={handleHoverEnd}
              />
            </div>

            {/* Monthly Summary */}
            <MonthlySummary currentDate={currentDate} monthData={monthData} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <LegendPanel />
            
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-lg mb-3">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Volatility:</span>
                  <span className="font-mono">4.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Vol Days:</span>
                  <span className="font-mono">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Volume:</span>
                  <span className="font-mono">5.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Day:</span>
                  <span className="font-mono text-green-600">+3.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Worst Day:</span>
                  <span className="font-mono text-red-600">-2.8%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-lg mb-3">Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                  Export Calendar
                </button>
                <button className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm">
                  Set Alerts
                </button>
                <button className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm">
                  Compare Periods
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        <CalendarTooltip
          date={tooltipData.date}
          data={tooltipData.data}
          position={tooltipData.position}
        />

        {/* Data Panel Modal */}
        {showPanel && (
          <DataPanel
            selectedDate={selectedDate}
            selectedData={selectedData}
            onClose={handleClosePanel}
          />
        )}
      </div>
    </div>
  );
};

export default MarketSeasonalityExplorer;