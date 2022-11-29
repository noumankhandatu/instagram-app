const jwt = require("jsonwebtoken");
const { jwtToken } = require("../envkey");
const mongoose = require("mongoose");
const mySchemaData = mongoose.model("mySchemaData");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtToken, async (err, payload) => {
      if (err) {
        return res.status(206).send("Token not matched");
      }
      const { id } = payload;
      const getUser = await mySchemaData.findById(id);
      req.user = getUser;
      next();
    });
  }
  if (!authorization) {
    return res.status(206).send("not authorized");
  }
};
