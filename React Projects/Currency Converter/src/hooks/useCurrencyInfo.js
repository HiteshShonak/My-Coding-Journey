import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [currencyInfo, setCurrencyInfo] = useState({});

    useEffect(() => {
        if (!currency) return;
        
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch currency data');
                return response.json();
            })
            .then(res => {
                setCurrencyInfo(res[currency.toLowerCase()] || {});
            })
            .catch(error => {
                console.error('Error fetching currency info:', error);
                setCurrencyInfo({});
            });
    }, [currency]);

    return currencyInfo;
}

export default useCurrencyInfo;