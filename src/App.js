import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import OrderBook from "./features/orderBook/OrderBook";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <OrderBook />
    </div>
  );
}

export default App;
