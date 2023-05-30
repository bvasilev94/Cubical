const express = require("express");
const expressConfig = require("./config/express.js");
const handlebarsConfig = require("./config/handlebars.js");

const app = express();

const PORT = 5015;

// Express config
expressConfig(app);

// Handlebars config
handlebarsConfig(app);

// App routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
