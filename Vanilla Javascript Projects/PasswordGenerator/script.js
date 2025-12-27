// DOM Elements
const lengthInput = document.getElementById("lengthInput");
const lengthSlider = document.getElementById("lengthSlider");
const passwordOutput = document.querySelector(".generatedPassword");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

// Checkboxes
const options = {
    lower: document.getElementById("includeLower"),
    upper: document.getElementById("includeUpper"),
    digits: document.getElementById("includeDigits"),
    specials: document.getElementById("includeSpecials")
};

// Character Sets
const charSets = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    specials: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

// Sync Slider & Input
lengthSlider.addEventListener("input", (e) => {
    lengthInput.value = e.target.value;
});
lengthInput.addEventListener("input", (e) => {
    lengthSlider.value = e.target.value;
});

// Generate Logic
generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value);
    let allowedChars = "";
    let password = "";

    // Build Character Pool
    if (options.lower.checked) allowedChars += charSets.lower;
    if (options.upper.checked) allowedChars += charSets.upper;
    if (options.digits.checked) allowedChars += charSets.digits;
    if (options.specials.checked) allowedChars += charSets.specials;

    // Validation
    if (length < 1 || length > 100) {
        passwordOutput.value = "Invalid Length!";
        return;
    }
    if (allowedChars.length === 0) {
        passwordOutput.value = "Select an option!";
        return;
    }

    // Generate Loop
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordOutput.value = password;
});

// Copy Logic
copyBtn.addEventListener("click", () => {
    const text = passwordOutput.value;
    if (!text || text === "Select an option!" || text === "Invalid Length!") return;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✔️";
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    });
});