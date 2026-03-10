const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.FRONTEND_PORT || 8000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
});
