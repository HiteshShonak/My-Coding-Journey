# PokeDex

A premium, glassmorphism-style Pokédex that fetches live data from the PokeAPI.

## 🚀 Features

### Core Functionality
* **Live Search:** Instantly fetch data for any Pokémon by name.
* **Visual Stats:** Dynamic progress bars for HP, Attack, Defense, and Speed.
* **Shiny Mode ✨:** A toggle button to switch between the standard and Shiny sprites.
* **Type Badges:** Color-coded badges for every Pokémon type (Fire, Water, Grass, etc.).

### UX Enhancements
* **Smart Error Handling:** If a Pokémon isn't found, a custom **Glassmorphism Toast Notification** bounces in to alert you (instead of a boring alert box).
* **Persistent State:** Uses `localStorage` to remember your last search. If you refresh the page, your Pokémon is still there!
* **Animations:** Features a floating Pokémon idle animation and smooth entry effects for errors.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure.
* **CSS3:** Advanced Glassmorphism, Keyframe Animations, and Flexbox/Grid layouts.
* **JavaScript (ES6+):** `async/await` for API fetching, DOM manipulation, and LocalStorage integration.

## 📂 Project Structure
```text
/
├── index.html   # Main interface
├── style.css    # Glass UI, Animations, and Responsive Design
├── script.js    # API Fetch logic, Toast system, and State Management
└── assets/
    └── pokeball.png