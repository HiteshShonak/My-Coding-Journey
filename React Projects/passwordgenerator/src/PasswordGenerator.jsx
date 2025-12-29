import { useState, useEffect, useCallback, useMemo } from "react";

const CHAR_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+"
};

const optionsList = [
    { key: 'includeUppercase', label: 'Uppercase' },
    { key: 'includeLowercase', label: 'Lowercase' },
    { key: 'includeNumbers', label: 'Numbers' },
    { key: 'includeSymbols', label: 'Symbols' }
];

function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [options, setOptions] = useState({
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false
    });
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState(0);

    // -- LOGIC --
    const calculateStrength = useCallback((pass) => {
        let score = 0;
        if (!pass) return 0;
        if (pass.length > 8) score++;
        if (pass.length > 14) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return Math.min(score, 4);
    }, []);

    const characterPool = useMemo(() => {
        let pool = "";
        if (options.includeUppercase) pool += CHAR_SETS.uppercase;
        if (options.includeLowercase) pool += CHAR_SETS.lowercase;
        if (options.includeNumbers) pool += CHAR_SETS.numbers;
        if (options.includeSymbols) pool += CHAR_SETS.symbols;
        return pool;
    }, [options]);

    const generatePassword = useCallback(() => {
        if (!characterPool) {
            setPassword("");
            setStrength(0);
            return;
        }
        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            generatedPassword += characterPool[randomIndex];
        }
        setPassword(generatedPassword);
        setStrength(calculateStrength(generatedPassword));
        setCopied(false);
    }, [characterPool, length, calculateStrength]);

    useEffect(() => {
        generatePassword();
    }, [length, options]);

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleOptionChange = (key) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Soft Pastel Colors for Strength
    const getStrengthColor = () => {
        if (strength === 0) return "bg-slate-700";
        if (strength <= 2) return "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.4)]"; 
        if (strength === 3) return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]"; 
        return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]"; 
    };

    return (
        <div className="soft-panel w-full max-w-md p-8 rounded-3xl relative transition-transform duration-300 hover:scale-[1.01]">
            
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">
                    Password Generator
                </h1>
                <p className="text-slate-400 text-sm font-medium">Create high-security passwords.</p>
            </div>

            {/* Display Field */}
            <div className="deep-input rounded-xl p-4 mb-6 flex items-center justify-between relative group">
                <input 
                    type="text" 
                    value={password}
                    readOnly
                    className="bg-transparent w-full text-lg font-mono text-white outline-none placeholder-slate-600"
                    placeholder="..."
                />
                
                <button 
                    onClick={copyToClipboard}
                    className="ml-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
                    title="Copy"
                >
                   {copied ? (
                       <span className="text-emerald-400 font-bold text-sm animate-pulse">Copied</span>
                   ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                       </svg>
                   )}
                </button>
            </div>

            {/* Animated Strength Bars */}
            <div className="flex gap-2 mb-8 h-1.5 px-1">
                {[1, 2, 3, 4].map((level) => (
                    <div 
                        key={level}
                        className={`h-full flex-1 rounded-full transition-all duration-500 ease-out ${strength >= level ? getStrengthColor() : "bg-slate-700"}`}
                    ></div>
                ))}
            </div>

            {/* Controls */}
            <div className="space-y-6">
                
                {/* Length Control */}
                <div className="deep-input p-5 rounded-xl flex flex-col gap-4 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-shadow">
                    <div className="flex justify-between items-center">
                        <label className="text-slate-300 text-sm font-bold tracking-wide">LENGTH</label>
                        <span className="text-xl font-bold text-sky-400">{length}</span>
                    </div>
                    <input 
                        type="range" 
                        min="6" 
                        max="64" 
                        value={length} 
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Options Grid - Tactile Cards */}
                <div className="grid grid-cols-2 gap-3">
                    {optionsList.map(({ key, label }) => (
                        <div 
                            key={key} 
                            onClick={() => handleOptionChange(key)}
                            className={`
                                cursor-pointer select-none p-4 rounded-xl border transition-all duration-200 flex items-center gap-3
                                hover:translate-y-[-2px] active:translate-y-px
                                ${options[key] 
                                    ? "bg-sky-500/10 border-sky-500/50 shadow-[0_4px_12px_rgba(14,165,233,0.1)]" 
                                    : "bg-transparent border-slate-700 hover:border-slate-500"}
                            `}
                        >
                           <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${options[key] ? "bg-sky-500 border-sky-500" : "border-slate-500"}`}>
                                {options[key] && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                           </div>
                           <span className={`text-sm font-semibold ${options[key] ? "text-sky-100" : "text-slate-400"}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* The Tactile 3D Button */}
                <button 
                    onClick={generatePassword}
                    className="btn-3d w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-lg tracking-wider uppercase mt-4"
                >
                    Generate Password
                </button>
            </div>
        </div>
    );
}

export default PasswordGenerator;