// components.js - UI Components
import React, { useState, useEffect } from 'react';
import { ChevronLeft, TrendingUp, TrendingDown, Activity, Volume2, Download, ArrowUp, ArrowDown, Minus, BarChart3, PieChart, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { generateMockData, generateIntradayData, calculateMonthlySummary } from './utils.js';

// Tooltip component for calendar cells
export const CalendarTooltip = ({ date, data, position }) => {
  if (!date || !data || !position) return null;

  return (
    <div 
      className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl border border-gray-700 pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: position.x > window.innerWidth - 250 ? 'translateX(-100%)' : 'none'
      }}
    >
      <div className="font-semibold mb-2 text-blue-300">
        {date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Price Range:</span>
          <span className="font-mono">
            ${data.low.toLocaleString()} - ${data.high.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Close:</span>
          <span className="font-mono">${data.close.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Volume:</span>
          <span className="font-mono">{(data.volume / 1000000).toFixed(1)}M</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Volatility:</span>
          <span className={`font-mono ${
            data.volatility > 0.05 ? 'text-red-400' : 
            data.volatility > 0.03 ? 'text-yellow-400' : 'text-green-400'
          }`}>
            {(data.volatility * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Performance:</span>
          <span className={`font-mono flex items-center ${
            data.performance > 0 ? 'text-green-400' : 
            data.performance < 0 ? 'text-red-400' : 'text-gray-400'
          }`}>
            {data.performance > 0.01 ? <ArrowUp className="w-3 h-3 mr-1" /> :
             data.performance < -0.01 ? <ArrowDown className="w-3 h-3 mr-1" /> :
             <Minus className="w-3 h-3 mr-1" />}
            {(data.performance * 100).toFixed(2)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Liquidity:</span>
          <div className="flex items-center">
            <div className="w-12 h-2 bg-gray-700 rounded-full mr-2">
              <div 
                className="h-full bg-blue-400 rounded-full transition-all duration-300"
                style={{ width: `${data.liquidity * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs">{(data.liquidity * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VolatilityCell = ({ date, data, view, isSelected, onSelect, isToday, onHover, onHoverEnd }) => {
  const getVolatilityColor = (volatility) => {
    if (volatility < 0.03) return 'bg-green-100 border-green-300 text-green-800';
    if (volatility < 0.05) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-red-100 border-red-300 text-red-800';
  };

  const getPerformanceIndicator = (performance) => {
    if (performance > 0.01) return <ArrowUp className="w-3 h-3 text-green-600" />;
    if (performance < -0.01) return <ArrowDown className="w-3 h-3 text-red-600" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getLiquidityPattern = (liquidity) => {
    const opacity = Math.round(liquidity * 10) / 10;
    return {
      background: `linear-gradient(45deg, transparent ${(1-opacity)*50}%, rgba(59, 130, 246, 0.3) ${(1-opacity)*50}%)`
    };
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onHover(date, data, {
      x: rect.right,
      y: rect.top
    });
  };

  return (
    <div
      className={`
        relative p-2 border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10
        ${getVolatilityColor(data.volatility)}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isToday ? 'ring-2 ring-purple-500' : ''}
        ${view === 'daily' ? 'min-h-[80px]' : 'min-h-[60px]'}
      `}
      onClick={() => onSelect(date, data)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
      style={getLiquidityPattern(data.liquidity)}
    >
      <div className="flex justify-between items-start">
        <span className="font-semibold text-sm">
          {view === 'daily' ? date.getDate() : 
           view === 'weekly' ? `W${Math.ceil(date.getDate()/7)}` :
           date.toLocaleDateString('en-US', { month: 'short' })}
        </span>
        {getPerformanceIndicator(data.performance)}
      </div>
      
      {view === 'daily' && (
        <div className="mt-1 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <Volume2 className="w-3 h-3" />
            <span>{(data.volume / 1000000).toFixed(1)}M</span>
          </div>
          <div className="text-xs font-mono">
            {(data.volatility * 100).toFixed(1)}%
          </div>
        </div>
      )}
      
      {view !== 'daily' && (
        <div className="mt-1 text-xs">
          Vol: {(data.volatility * 100).toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export const CalendarGrid = ({ currentDate, view, selectedDate, onDateSelect, onHover, onHoverEnd }) => {
  const [monthData, setMonthData] = useState({});

  useEffect(() => {
    const data = {};
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Generate data for the entire month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      data[day] = generateMockData(date);
    }
    setMonthData(data);
  }, [currentDate]);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    const data = monthData[day] || generateMockData(date);

    days.push(
      <VolatilityCell
        key={day}
        date={date}
        data={data}
        view={view}
        isSelected={isSelected}
        isToday={isToday}
        onSelect={onDateSelect}
        onHover={onHover}
        onHoverEnd={onHoverEnd}
      />
    );
  }

  return (
    <div className="grid grid-cols-7 gap-1 bg-white rounded-lg p-4 shadow-lg">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="p-2 text-center font-semibold text-gray-600 text-sm">
          {day}
        </div>
      ))}
      {days}
    </div>
  );
};

export const RealTimeGraph = () => {
  const [intradayData, setIntradayData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(48000);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    // Initialize with generated data
    const initialData = generateIntradayData();
    setIntradayData(initialData);
    setCurrentPrice(initialData[initialData.length - 1].price);
    setPriceChange(initialData[initialData.length - 1].change);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setIntradayData(prevData => {
        const newData = [...prevData];
        const lastPrice = newData[newData.length - 1].price;
        const change = (Math.random() - 0.5) * 200;
        const newPrice = Math.max(40000, Math.min(60000, lastPrice + change));
        const startPrice = newData[0].price;
        const newChange = ((newPrice - startPrice) / startPrice) * 100;

        // Update the last data point or add a new one
        const now = new Date();
        const currentHour = now.getHours();
        const timeStr = `${currentHour.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        if (newData.length > 24) {
          newData.shift(); // Remove the oldest data point
        }

        newData.push({
          time: timeStr,
          price: newPrice,
          volume: Math.random() * 2000000 + 500000,
          change: newChange
        });

        setCurrentPrice(newPrice);
        setPriceChange(newChange);
        return newData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
          <p className="text-blue-300 font-semibold">{`Time: ${label}`}</p>
          <p className="text-green-300">{`Price: ${payload[0].value.toLocaleString()}`}</p>
          {payload[1] && <p className="text-yellow-300">{`Volume: ${(payload[1]?.value / 1000000).toFixed(1)}M`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Today's Live Market Data
          </h3>
          <p className="text-gray-600 text-sm">Real-time price movements and volume</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            ${currentPrice.toLocaleString()}
          </div>
          <div className={`text-sm font-semibold flex items-center justify-end ${
            priceChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Chart */}
        <div className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intradayData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Chart */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Volume Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intradayData.slice(-8)}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={10}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={10}
                  tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [`${(value/1000000).toFixed(1)}M`, 'Volume']}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#volumeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-xs text-blue-600 font-medium">24h High</div>
          <div className="text-lg font-bold text-blue-800">
            ${Math.max(...intradayData.map(d => d.price)).toLocaleString()}
          </div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-xs text-red-600 font-medium">24h Low</div>
          <div className="text-lg font-bold text-red-800">
            ${Math.min(...intradayData.map(d => d.price)).toLocaleString()}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-xs text-green-600 font-medium">Avg Volume</div>
          <div className="text-lg font-bold text-green-800">
            {(intradayData.reduce((sum, d) => sum + d.volume, 0) / intradayData.length / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-xs text-purple-600 font-medium">Volatility</div>
          <div className="text-lg font-bold text-purple-800">
            {intradayData.length > 0 ? 
              (Math.abs(Math.max(...intradayData.map(d => d.change)) - Math.min(...intradayData.map(d => d.change)))).toFixed(1) 
              : '0.0'}%
          </div>
        </div>
      </div>
    </div>
  );
};

export const LegendPanel = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="font-semibold text-lg mb-3">Legend</h3>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-2">Volatility Levels</h4>
          <div className="flex space-x-2 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-1"></div>
              <span>Low (&lt;3%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded mr-1"></div>
              <span>Medium (3-5%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-1"></div>
              <span>High (&gt;5%)</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Performance</h4>
          <div className="flex space-x-3 text-xs">
            <div className="flex items-center">
              <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
              <span>Positive</span>
            </div>
            <div className="flex items-center">
              <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
              <span>Negative</span>
            </div>
            <div className="flex items-center">
              <Minus className="w-3 h-3 text-gray-400 mr-1" />
              <span>Neutral</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Liquidity</h4>
          <div className="text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-transparent via-blue-200 to-blue-300 rounded mr-1"></div>
              <span>Diagonal pattern intensity = liquidity level</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};