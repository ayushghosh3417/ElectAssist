# ElectAssist - Interactive Election Education Portal

ElectAssist is a modern, interactive web application designed to demystify the election process for citizens. Built with a premium, square-edged "White and Ocean Blue" glass-morphic design, the platform provides educational modules on voting procedures and features an integrated AI assistant to answer any election-related questions in real-time.

## ✨ Features

- **Cinematic Splash Screen:** A beautiful, animated intro sequence that seamlessly reveals the application.
- **AI Help Center:** A dedicated chat interface integrated directly with the Google Gemini API (gemini-2.5-flash) to answer user questions on the fly.
- **Voice-to-Text Support:** Users can ask the AI questions using their voice via the Web Speech API.
- **Parallax & Scroll Reveal:** Advanced scrolling effects, including a slow-moving glass-grid background and dynamic elements that slide into view as you scroll.
- **Fully Responsive:** Optimized layouts for mobile, tablet, and desktop viewing, featuring horizontal scrollable navigation for smaller screens.
- **Educational Modules:** Detailed sections on Voter Registration, Election Timelines, Ways to Vote, KYC (Know Your Candidate), and the cVIGIL app.

## 🛠️ Technologies Used

- **HTML5** for semantic structure.
- **Vanilla CSS3** for all styling, grid layouts, animations, and responsive media queries (No external frameworks like Tailwind or Bootstrap).
- **Vanilla JavaScript (ES6)** for state management, DOM manipulation, animations, and API integrations.
- **Google Gemini API** for intelligent, generative AI responses.
- **Web Speech API** for native browser voice recognition.
- **FontAwesome** for scalable vector icons.
- **Google Fonts** (Inter and Outfit) for typography.

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone or Download** this repository/folder to your local machine.
2. **Set up the Gemini API Key**:
   - Open `script.js` in your preferred code editor.
   - Locate the `GEMINI_API_KEY` constant at the top of the chat logic section.
   - Replace the placeholder string with your actual Google Gemini API key.
   *(Note: For production environments, do not hardcode API keys. Use a backend server to proxy requests securely.)*
3. **Run the Application**:
   - Because the application makes network requests (to the Gemini API) and uses the Web Speech API, it is highly recommended to serve it via a local web server to avoid CORS or browser security policy issues.
   - If you use VS Code, you can use the **Live Server** extension. Simply right-click `index.html` and select "Open with Live Server".

## 📁 File Structure

- `index.html`: The main markup file containing the layout and static elements.
- `style.css`: The comprehensive stylesheet including animations, parallax setups, glass-morphic variables, and responsive media queries.
- `script.js`: The central logic controller handling topic navigation, scroll observers, timeline injections, and the Gemini AI chat interface.

## 🎨 Design System
The UI utilizes a sharp, square-corner aesthetic with no border radiuses on major components. It relies heavily on drop shadows, linear gradients, and semi-transparent white backgrounds (`backdrop-filter`) over a patterned light blue canvas to create a "glass-beveled" look.
