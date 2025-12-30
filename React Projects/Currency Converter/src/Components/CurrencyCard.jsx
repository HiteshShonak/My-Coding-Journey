import {useId} from "react";
import "./CurrencyCard.css";


function CurrencyCard({label, amount, onAmountChange, onCurrencyChange, currencyOptions=[], 
                    selectedCurrency = "USD", amountDisabled=false, currencyDisabled=false, className=""}) {

    const amountInputId = useId();

    return (
        <div className={`p-4 border rounded-lg shadow-lg bg-amber-50 CurrencyCard ${className}`}
        style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', margin: '0 auto', maxWidth: '90vh'}}>
            <div className="flex justify-between">
               <span><label htmlFor={amountInputId}>{label}</label></span>
                <span>Currency Type</span> 
            </div>
            <div className="flex justify-between">
                <span><input type="number" 
                id={amountInputId}
                value={amount}
                className={`outline-none w-full mr-2`} 
                disabled={amountDisabled} 
                onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))} /></span>


                <span>
                    <select 
                        value={selectedCurrency}
                        className="outline-none w-full mr-2" 
                        disabled={currencyDisabled}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}>
                        {currencyOptions.map(option => (
                            <option key={option} 
                                    value={option}>

                                    {option}

                            </option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
    );
}

export default CurrencyCard;