
export const generateMockData = (date) => {
  const seed = date.getTime();
  const random = (min, max) => min + (Math.sin(seed + min) * 0.5 + 0.5) * (max - min);
  
  return {
    open: random(45000, 55000),
    close: random(45000, 55000),
    high: random(50000, 60000),
    low: random(40000, 50000),
    volume: random(1000000, 10000000),
    volatility: random(0.01, 0.08),
    liquidity: random(0.5, 1.0),
    performance: random(-0.05, 0.05)
  };
};


export const generateIntradayData = () => {
  const data = [];
  const startPrice = 48000;
  let currentPrice = startPrice;
  
  for (let i = 0; i < 24; i++) {
    const hour = i;
    const change = (Math.random() - 0.5) * 1000;
    currentPrice += change;
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      price: currentPrice,
      volume: Math.random() * 2000000 + 500000,
      change: ((currentPrice - startPrice) / startPrice) * 100
    });
  }
  return data;
};

export const calculateMonthlySummary = (monthData) => {
  const values = Object.values(monthData);
  if (values.length === 0) return null;

  const totalVolume = values.reduce((sum, day) => sum + day.volume, 0);
  const avgVolatility = values.reduce((sum, day) => sum + day.volatility, 0) / values.length;
  const performances = values.map(day => day.performance);
  const volatilities = values.map(day => day.volatility);
  
  const positivedays = performances.filter(p => p > 0).length;
  const negativeDays = performances.filter(p => p < 0).length;
  const neutralDays = values.length - positivedays - negativeDays;
  
  const bestDay = Math.max(...performances);
  const worstDay = Math.min(...performances);
  const avgPerformance = performances.reduce((sum, p) => sum + p, 0) / performances.length;
  
  const highVolDays = volatilities.filter(v => v > 0.05).length;
  const mediumVolDays = volatilities.filter(v => v >= 0.03 && v <= 0.05).length;
  const lowVolDays = volatilities.filter(v => v < 0.03).length;

  return {
    totalDays: values.length,
    totalVolume,
    avgVolume: totalVolume / values.length,
    avgVolatility,
    avgPerformance,
    bestDay,
    worstDay,
    positiveDays: positivedays,
    negativeDays,
    neutralDays,
    highVolDays,
    mediumVolDays,
    lowVolDays,
    avgPrice: values.reduce((sum, day) => sum + day.close, 0) / values.length,
    priceRange: {
      high: Math.max(...values.map(day => day.high)),
      low: Math.min(...values.map(day => day.low))
    }
  };
};