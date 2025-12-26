# Calculator 🧮

A mobile-responsive calculator featuring a persistent tape history, tactile button feedback, and local state management.

## 🚀 Features

### Core Functionality
* **Arithmetic Operations:** Supports basic addition, subtraction, multiplication, and division.
* **Advanced Functions:** Includes dedicated buttons for Square (`x²`) and Square Root (`√x`).
* **Keyboard Support:** Full keyboard event listening for digits, operators, Enter (Calculate), Backspace (Delete), and Escape (Clear).

### Persistence & History
* **Tape History Sidebar:** A slide-out sidebar that records every calculation (e.g., `50 * 2 = 100`).
* **State Persistence:** Uses `localStorage` to save the calculation history and the current screen value. The calculator retains its state even after the browser is closed or refreshed.

### UI/UX Design
* **Tactile Feedback:** Buttons simulate physical depth with active states (3D press effect).
* **Responsive Layout:** Designed with specific padding (`.main-wrapper`) to ensure the interface is accessible and never touches screen edges on mobile devices.
* **Glassmorphism Elements:** The history sidebar uses `backdrop-filter` for a translucent, modern aesthetic.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure for the calculator grid and sidebar.
* **CSS3:** CSS Grid Layout, Flexbox, transitions, and media queries.
* **JavaScript (ES6+):** DOM manipulation, safe math logic using `eval()`, `localStorage` API, and event listeners.

## 📂 Project Structure

```text
/
├── index.html   # Main calculator structure
├── style.css    # Styles for grid layout, glassmorphism, and responsive design
└── script.js    # Logic for calculations, history management, and persistence
```

## 🏃‍♂️ How to Run

1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Start calculating!