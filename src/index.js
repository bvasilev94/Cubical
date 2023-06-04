const express = require("express");

const expressConfig = require("./config/express.js");
const handlebarsConfig = require("./config/handlebars.js");
const routes = require("./routes.js");
const dbConnect = require("./config/db.js");

const app = express();

const PORT = 5015;

// Express config
expressConfig(app);
// Handlebars config
handlebarsConfig(app);

dbConnect()
  .then(() => console.log("DB Connected succesfully"))
  .catch((err) => console.log("DB error:", err));

// App routes
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
