const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3001;
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Server started at http://localhost:${port}`);
});

app.listen(port, () => {
  console.log("Server started at", port);
});
