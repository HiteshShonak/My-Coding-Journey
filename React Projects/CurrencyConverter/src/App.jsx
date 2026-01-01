import { useState, useEffect } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import CurrencyCard from './Components/CurrencyCard';
import bg0 from './assets/bg0.webp';
import bg1 from './assets/bg1.webp';
import bg2 from './assets/bg2.webp';
import bg3 from './assets/bg3.webp';
import bg4 from './assets/bg4.webp';
import bg5 from './assets/bg5.webp'; 
import bg6 from './assets/bg6.webp';
import bg7 from './assets/bg7.webp';
import bg8 from './assets/bg8.webp';
import bg9 from './assets/bg9.webp';
import bg10 from './assets/bg10.webp';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});



  useEffect(() => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [currencyInfo, to]);

  useEffect(() => {
    const backgrounds = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const selectedImage = backgrounds[randomIndex];
    document.body.style.backgroundImage = `url(${selectedImage}), radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 100%)`;
  }, []);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount); 
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
        setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 ">
      
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/50 relative">
        
        
        <h1 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-500">
          Currency Converter
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="flex flex-col gap-4"
        >
          <CurrencyCard
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectedCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <div className="relative h-2">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-slate-800 rounded-full bg-blue-600 text-white p-2.5 hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all shadow-lg z-10"
              onClick={swap}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
              </svg>
            </button>
          </div>

          <CurrencyCard
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectedCurrency={to}
            amountDisabled
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.98] transition-all mt-4"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>

      <p className="mt-6 text-slate-500 text-sm font-medium drop-shadow-md">
        Real-time exchange rates 
      </p>
    </div>
  );
}

export default App;