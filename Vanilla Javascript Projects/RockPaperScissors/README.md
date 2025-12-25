# Neon Rock Paper Scissors 👊🤚✌️

A responsive, fully interactive Rock Paper Scissors game featuring a glassmorphism UI, streak tracking, and persistent scoring.

## 🚀 Features

### Core Gameplay
* **Classic Logic:** Play Rock, Paper, Scissors against a computerized opponent.
* **Win/Loss/Draw States:** Visual feedback with distinct color coding (Green for Win, Red for Loss, Orange for Draw).
* **Challenge Mode:** The game board locks after each round, displaying an overlay button to reset the match.

### Gamification & Persistence
* **Streak Counter:** Tracks your current winning streak in real-time.
* **High Score Saving:** Uses `localStorage` to save your "Best Streak" permanently, even if the browser is closed.
* **Rule Book:** A built-in modal explaining the game rules and streak reset logic.

### UI/UX Design
* **Glassmorphism Style:** Translucent frosted glass effects using `backdrop-filter`.
* **Fully Responsive:** Uses CSS `clamp()` for fluid typography and button sizing across all devices.
* **Mobile Optimized:** Includes a "safe zone" layout and mobile haptic feedback (vibration) on interactions.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure and modal layout.
* **CSS3:** Flexbox, CSS Variables, Absolute Positioning (for overlays), and Responsive Design.
* **JavaScript (ES6+):** DOM manipulation, Game Logic, Local Storage API, and Vibration API.

## 📂 Project Structure

```text
/
├── index.html   # Main game structure and modal
├── style.css    # Styling, animations, and responsive layouts
└── script.js    # Game logic, state management, and event listeners
```

## 🧠 Key Concepts Learned

* **State Management:** Handling game states (`isGameActive`) to prevent multiple clicks during a round.
* **Browser Storage:** Implementing `localStorage` to persist data (High Score) between sessions.
* **CSS Positioning:** Using `position: absolute` and `z-index` to create overlay interfaces.
* **Responsive Units:** Utilizing `clamp()` for elements that scale smoothly between mobile and desktop sizes.

## 🏃‍♂️ How to Run

1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Start playing!