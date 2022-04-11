const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
app.use(express.static(path.join(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./", "build", "index.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
