const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server started at", port);
});
