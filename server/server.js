const express = require("express");
require("dotenv").config()

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
// giup doc duoc cac data theo kieu data object
app.use(express.urlencoded({ extended: true }));

app.use("/", (res, req) => {
  res.send("START SERVER");
});

app.listen(port, () => {
  console.log("Server running: " + port);
});
