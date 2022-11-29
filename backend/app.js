const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { key } = require("./envkey");
const { jwtToken } = require("./envkey");
const PORT = 9000;
const cors = require("cors");
app.use(cors());

// schema is imported
require("./schema/index");
require("./schema/post");
// it will send data in json format
app.use(express.json());
// this is how we use routers in nodejs
app.use(require("./routes/index"));

app.use(require("./routes/createPost"));

// mongoose will connect us to database
mongoose.connect(key);
// checking if connected or not
mongoose.connection.on("connected", () => {
  console.log("connect to mongo db");
});
mongoose.connection.on("error", () => {
  console.log("not connect to mongo db");
});
//
app.listen(PORT, () => {
  console.log("server is listening");
});
