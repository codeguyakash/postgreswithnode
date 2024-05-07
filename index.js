const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (request, response) => {
  response.status(200).json("Server Running");
});

app.listen(PORT, () => console.log(`Server Running...`, PORT));
