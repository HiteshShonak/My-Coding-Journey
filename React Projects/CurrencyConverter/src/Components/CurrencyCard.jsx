import { useId, useState, useRef, useEffect } from "react";

function CurrencyCard({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "USD",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
    const amountInputId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    // Heuristic for flags
    const countryCode = selectedCurrency.slice(0, 2).toLowerCase();

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSelect = (currency) => {
        onCurrencyChange && onCurrencyChange(currency);
        setIsOpen(false);
    };

    return (
        <div className={`input-group p-5 rounded-2xl flex flex-col gap-3 relative ${className}`}>
            
            {/* Header Row */}
            <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <label htmlFor={amountInputId}>{label}</label>
                <span>Currency</span>
            </div>

            {/* Content Row */}
            <div className="flex justify-between items-center gap-4">
                
                {/* Clean Input (No Spinners) */}
                <input
                    id={amountInputId}
                    type="number"
                    placeholder="0"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    className="w-full bg-transparent text-3xl font-bold text-white outline-none placeholder-slate-600"
                />

                {/* --- CUSTOM DROPDOWN --- */}
                <div className="relative" ref={dropdownRef}>
                    
                    {/* The Trigger Button */}
                    <button
                        type="button"
                        onClick={() => !currencyDisabled && setIsOpen(!isOpen)}
                        disabled={currencyDisabled}
                        className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 rounded-xl px-3 py-2 transition-all min-w-[100px] justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <img 
                                src={`https://flagcdn.com/w40/${countryCode}.png`} 
                                alt="flag" 
                                className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                                onError={(e) => e.target.style.display = 'none'} 
                            />
                            <span className="font-bold text-white uppercase">{selectedCurrency}</span>
                        </div>
                        {/* Chevron Icon */}
                        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* The Dropdown List (Only shows when Open) */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-32 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                            <div className="max-h-40 overflow-y-auto custom-scroll p-1">
                                {currencyOptions.map((currency) => (
                                    <div 
                                        key={currency} 
                                        onClick={() => handleSelect(currency)}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
                                            ${selectedCurrency === currency ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}
                                        `}
                                    >
                                        <img 
                                            src={`https://flagcdn.com/w20/${currency.slice(0,2).toLowerCase()}.png`} 
                                            alt="" 
                                            className="w-4 h-3 object-cover rounded-[1px]"
                                        />
                                        <span className="text-sm font-medium uppercase">{currency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CurrencyCard;