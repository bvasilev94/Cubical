const express = require("express");
const expressConfig = require("./config/express.js");
const handlebarsConfig = require("./config/handlebars.js");
const homeController = require("./controllers/homeController.js");
const cubeController = require("./controllers/cubeController.js");

const app = express();

const PORT = 5015;

// Express config
expressConfig(app);

// Handlebars config
handlebarsConfig(app);

// App routes
app.use(homeController);
app.use('/cubes', cubeController);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
