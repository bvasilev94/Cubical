const express = require("express");

const app = express();

const PORT = 5015;

app.get("/", (req, res) => {
  res.send("Hello from Cubical");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
