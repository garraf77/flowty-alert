const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve i file statici da /public
app.use(express.static(path.join(__dirname, "public")));

// Proxy per chiamare Flowty
app.post("/flowty", express.json(), async (req, res) => {
  try {
    const response = await fetch("https://www.flowty.io/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Errore proxy", details: err.message });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
