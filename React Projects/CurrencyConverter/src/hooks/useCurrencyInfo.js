import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return;
        
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency.toLowerCase()]))
            .catch((err) => console.error("Currency API Error:", err));
            
    }, [currency]);

    return data;
}

export default useCurrencyInfo;