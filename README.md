# Market Seasonality Explorer

A sophisticated React-based financial data visualization tool that provides an interactive calendar interface for exploring market volatility, performance, and trading patterns. This application offers real-time market data visualization with comprehensive analytics and detailed daily breakdowns.

## 📺 Demo Video

Watch the application in action: [Market Seasonality Explorer Demo](https://drive.google.com/file/d/1YcEPSQqRMsqifhFE9Mh8oNoqw2cZzT03/view?usp=drive_link)

## ✨ Features

### 📅 Interactive Calendar Interface
- **Monthly Calendar View**: Navigate through different months with intuitive controls
- **Color-coded Volatility**: Visual representation of market volatility levels (Low/Medium/High)
- **Performance Indicators**: Arrow indicators showing daily performance (up/down/neutral)
- **Liquidity Patterns**: Diagonal patterns indicating liquidity levels
- **Hover Tooltips**: Detailed information on hover with comprehensive metrics

### 📊 Real-time Market Data
- **Live Price Chart**: Real-time price movements with area chart visualization
- **Volume Distribution**: Live volume tracking and visualization
- **24h Statistics**: High, low, average volume, and volatility metrics
- **Auto-updating Data**: Simulated real-time updates every 3 seconds

### 📈 Comprehensive Analytics
- **Monthly Summary Statistics**: Complete overview of trading month
- **Performance Distribution**: Breakdown of positive, negative, and neutral days
- **Volatility Analysis**: Classification of high, medium, and low volatility days
- **Volume Analytics**: Average volume and trading activity metrics
- **Price Range Analysis**: Monthly high/low tracking

### 🔍 Detailed Day View
- **Modal Data Panel**: Comprehensive daily analysis in a dedicated interface
- **Technical Indicators**: RSI, Moving Averages, and other key metrics
- **Risk Assessment**: Volatility and liquidity risk indicators
- **Price Action Visualization**: Intraday price movement charts
- **Trading Metrics**: Volume ratios, price ranges, and trend strength

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Keyboard Navigation**: Arrow keys for month navigation, ESC for closing modals
- **Modern UI**: Gradient backgrounds, smooth transitions, and professional styling
- **Export Functionality**: Data export capabilities (UI ready)
- **Settings Panel**: Customizable view options

## 🚀 Getting Started

### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn** (version 1.22 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/market-seasonality-explorer.git
   cd market-seasonality-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📦 Dependencies

### Core Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### UI and Styling
```json
{
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0"
}
```

### Data Visualization
```json
{
  "recharts": "^2.8.0"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.0.3",
  "vite": "^4.4.5",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24"
}
```

## 🛠️ Complete Setup Instructions

### 1. Create a New React Project

```bash
# Using Create React App
npx create-react-app market-seasonality-explorer
cd market-seasonality-explorer

# Or using Vite (recommended for better performance)
npm create vite@latest market-seasonality-explorer -- --template react
cd market-seasonality-explorer
```

### 2. Install Required Dependencies

```bash
# Install core dependencies
npm install react@^18.2.0 react-dom@^18.2.0

# Install UI and icon library
npm install lucide-react@^0.263.1

# Install chart library
npm install recharts@^2.8.0

# Install Tailwind CSS for styling
npm install -D tailwindcss@^3.3.0 postcss@^8.4.24 autoprefixer@^10.4.14
```

### 3. Configure Tailwind CSS

```bash
# Initialize Tailwind CSS
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind directives to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Project Structure

```
my-app/
├── public/
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── MarketSeasonalityExplorer.js
│   ├── MonthlySummary.js
│   ├── postcss.config.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── utils.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

### 5. Add the Component

Replace the contents of `src/App.js`:
```javascript
import React from 'react';
import MarketSeasonalityExplorer from './MarketSeasonalityExplorer';
import './index.css';

function App() {
  return (
    <div className="App">
      <MarketSeasonalityExplorer />
    </div>
  );
}

export default App;
```

Create `src/MarketSeasonalityExplorer.js` and paste the provided component code.
If you have separate files like `src/MonthlySummary.js` and `src/components.js`, organize your components accordingly.

## 🎯 Usage Guide

### Navigation
- **Month Navigation**: Use the left/right arrow buttons or keyboard arrow keys
- **Day Selection**: Click on any calendar day to view detailed information
- **Modal Navigation**: Click outside the modal or press ESC to close
- **Tooltip**: Hover over calendar cells for quick information

### Calendar Color Coding
- **🟢 Green**: Low volatility (< 3%)
- **🟡 Yellow**: Medium volatility (3-5%)
- **🔴 Red**: High volatility (> 5%)

### Performance Indicators
- **⬆️ Green Arrow**: Positive performance (> 1%)
- **⬇️ Red Arrow**: Negative performance (< -1%)
- **➖ Gray Line**: Neutral performance (-1% to 1%)

### Real-time Features
- Live price updates every 3 seconds
- Dynamic volume tracking
- Real-time volatility calculations
- 24-hour statistics updates

## 🔧 Customization

### Modifying Data Generation
The application uses mock data generators. To integrate real market data:

1. Replace `generateMockData()` function with your API calls
2. Update `generateIntradayData()` for real-time data
3. Modify data structure to match your API response

### Styling Customization
- Update Tailwind classes in components
- Modify color schemes in the volatility classification functions
- Adjust chart colors in Recharts components

### Adding New Features
- Extend the `calculateMonthlySummary()` function for new metrics
- Add new chart types using Recharts components
- Implement additional technical indicators

## 📊 Data Structure

### Daily Data Format
```javascript
{
  open: 48000,        // Opening price
  close: 48500,       // Closing price
  high: 49000,        // Daily high
  low: 47500,         // Daily low
  volume: 5000000,    // Trading volume
  volatility: 0.035,  // Volatility percentage (0-1)
  liquidity: 0.75,    // Liquidity score (0-1)
  performance: 0.012  // Daily performance (-1 to 1)
}
```

### Intraday Data Format
```javascript
{
  time: "14:30",      // Time string
  price: 48500,       // Current price
  volume: 1500000,    // Volume at time
  change: 1.25        // Percentage change from open
}
```

## 🔒 Browser Compatibility

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 🚨 Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   npm install
   # or delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Tailwind styles not loading**
   - Ensure Tailwind is properly configured
   - Check if `@tailwind` directives are in `index.css`
   - Verify `tailwind.config.js` content paths

3. **Charts not rendering**
   - Verify Recharts installation: `npm list recharts`
   - Check browser console for JavaScript errors
   - Ensure proper data format for chart components

4. **Performance issues**
   - Reduce real-time update frequency
   - Optimize data generation functions
   - Use React.memo for heavy components

### Development Tips

- Use React DevTools for debugging
- Enable browser's developer console for error tracking
- Test responsiveness using browser dev tools
- Use React Profiler for performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Recharts** for excellent charting capabilities
- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React** team for the amazing framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/market-seasonality-explorer/issues) page
2. Create a new issue with detailed information
3. Include browser version, Node.js version, and error messages

---

**Built with ❤️ for financial data visualization**