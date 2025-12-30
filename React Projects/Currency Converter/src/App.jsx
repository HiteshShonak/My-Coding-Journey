import { useState } from 'react'
import './App.css'
import CurrencyCard from './Components/CurrencyCard.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo.js';

function App() {

  const [amount, setAmount] =  useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(fromCurrency);

  const options = Object.keys(currencyInfo || {}).map(key => key.toUpperCase());
  const safeOptions = options.length > 0 ? options : ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"];

  function handleSwap(){
    const newFrom = toCurrency;
    const newTo = fromCurrency;

    setFromCurrency(newFrom);
    setToCurrency(newTo);
    setAmount(1);
    handleConvert();
  }

  function handleConvert(){
    if(currencyInfo && currencyInfo[toCurrency.toLowerCase()]){
      const rate = currencyInfo[toCurrency.toLowerCase()];
      setConvertedAmount(amount * rate);
    } else {
      console.warn('Currency rate not available for:', toCurrency);
    }
  }

  function handleFromAmountChange(val){
    setAmount(val);
  }

  function handleFromCurrencyChange(currency){
    setFromCurrency(currency);
  }

  function handleToCurrencyChange(currency){
    setToCurrency(currency);
  }
  return (
    <div className="Container">
      <h1 className='text-center font-bold mb-4 
                    text-4xl text-blue-300 text-shadow-lg'>Currency Converter</h1>
      <CurrencyCard 
      label="From" 
      amount={amount} 
      currencyOptions={safeOptions}
      onAmountChange={handleFromAmountChange}
      onCurrencyChange={handleFromCurrencyChange}
      selectedCurrency={fromCurrency}/>
      <div className='relative -my-3 z-10 flex justify-center'>
        <button 
        className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl shadow-lg active:scale-95 transition-transform'
        onClick={handleSwap}>
          Swap
        </button>
      </div>
      <CurrencyCard label="To" 
      amount={convertedAmount}
      currencyOptions={safeOptions}
      onAmountChange={setConvertedAmount}
      onCurrencyChange={handleToCurrencyChange}
      selectedCurrency={toCurrency}
      amountDisabled={true}
      />
      <button 
      className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition-transform"
      onClick={handleConvert}>
        Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
        </button>
    </div>
  )
  }
export default App
