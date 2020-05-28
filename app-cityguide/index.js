const express = require("express");
const app = express();
const DEFAULT_PORT = 3000;


app.get("/", (req, res) => {
    res.json("Home page - city guide");
  });

app.get("/cityguide", (req, res) => {
    res.json("Welcome to Paris");
  });
  


app.listen(DEFAULT_PORT, () => {
    console.log(`Listening on PORT: ${DEFAULT_PORT}`);
})
