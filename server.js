require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('./')); // Serve static files from the current directory

app.get('/api/config', (req, res) => {
    res.json({ apiKey: process.env.GEMINI_API_KEY });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
