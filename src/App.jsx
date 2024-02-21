import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setconvertedAmount] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/3005c9f1480f290a98c22a18/latest/${fromCurrency}`);
        
        if (response.data.conversion_rates && response.data.conversion_rates[toCurrency]) {
          setExchangeRate(response.data.conversion_rates[toCurrency]);
        } else {
          console.error(`Exchange rate for ${toCurrency} not found.`);
        }
      } catch (error) {
        console.error("Error fetching exchange rate: ", error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
     if(exchangeRate !== null) {
      setconvertedAmount((amount * exchangeRate).toFixed(2));
     }
  },[amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };
  return (
    <>
      <div className='container'>
        <div className='box'><img src="images/1.jpeg" alt="" /></div>
        <div className='data'>
          <h2>Currency Converter</h2>
          <div className='input-container'>
            <label htmlFor="amt">Amount:</label><br />
            <input type="number" id='amt' value={amount} onChange={handleAmountChange} />
          </div>
          <div className='input-container'>
            <label htmlFor="from-currency">From Currency:</label><br />
            <select id='from-currency' value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="USD">USD-United Status Dollar</option>
              <option value="KWD">Kuwaiti Dinar (KWD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="BHD">Bahraini Dinar (BHD)</option>
              <option value="GBP">Pound sterling(GBP)</option>
              <option value="LKR">SriLankan Rupees(LKR)</option>
              <option value="INR">Indian Rupees(INR)</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor="tocurrency">To Currency:</label><br />
            <select id='tocurrency' value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD-United Status Dollar</option>
              <option value="KWD">Kuwaiti Dinar (KWD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="BHD">Bahraini Dinar (BHD)</option>
              <option value="GBP">Pound sterling(GBP)</option>
              <option value="LKR">SriLankan Rupees(LKR)</option>
              <option value="INR">Indian Rupees(INR)</option>
            </select>
          </div>

          <div className='result'>
            <p>
              {amount} {fromCurrency} is equal to
              {convertedAmount} {toCurrency}
            </p>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
