const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/flowty", async (req, res) => {
  try {
    const response = await fetch("https://www.flowty.io/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Errore nella richiesta a Flowty." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});