# AnalytiXStocks - Smart Stock Analysis Platform

A comprehensive stock analysis platform for new and mid-level investors, providing real-time market data, predictive trends, and portfolio management tools.

## Features

- 📊 Live stock prices and market data
- 📈 Technical analysis and predictive trends
- 💼 Portfolio tracking and management
- 📱 Responsive design for all devices
- 🔔 Real-time notifications and alerts
- 📰 Market news and updates
- 🔒 Secure authentication system

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Chart.js for data visualization
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- WebSocket for real-time updates

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Alpha Vantage API key (for stock data)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/analytix-stocks.git
cd analytix-stocks
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment Setup:

Create `.env` files in both frontend and backend directories:

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ALPHA_VANTAGE_API_KEY=CT9M0AZ3X7BMNBT2

Backend (.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/analytix-stocks
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ALPHA_VANTAGE_API_KEY=CT9M0AZ3X7BMNBT2
```