const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

// templating engine
app.set("view engine", "ejs");
app.set(path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("landing");
});

app.listen(PORT, (req, res) => {
  console.log(`Listening on PORT ${PORT}`);
});
