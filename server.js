// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve static files like CSS and JS
app.use(express.static(path.join(__dirname, "public")));

// Route: Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// Route: About Me
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about.html"));
});

// Route: News
app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "views/news.html"));
});

// Route: Payment
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "views/payment.html"));
});

// 404 Page Not Found
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views/pagenotfound.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
