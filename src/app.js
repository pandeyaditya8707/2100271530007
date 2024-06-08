const express = require("express");
const { getNumberHandler } = require("./controllers/numberController");

const app = express();
const PORT = 3000;

app.get("/numbers/:numberid", getNumberHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
