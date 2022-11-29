const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtToken } = require("../envkey");
const requireLogin = require("../middleware/requireLogin");
// this will create mySchemaData thing in mongodb where data will be stored
const mySchemaData = mongoose.model("mySchemaData");
// these are same as app.get() we done it before but this is how routing occurs
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;
  //   we will first validate signup
  if (!name || !userName || !email || !password) {
    return res
      .status(206)
      .send("Please Make sure you have filled all the filled");
  }
  //   checking is there's any similar gmail at database
  mySchemaData.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(206)
        .send("Already user is present in database try with another gmail");
    }
    if (!savedUser) {
      // hashing password
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new mySchemaData({
          name,
          userName,
          email,
          password: hashedPassword,
        });
        res.status(200).send("Registration Successfull Hurray ... ! ");
        //   this below function is dope one it will directly save data to database
        //   we will save our user in mongodb database
        user
          .save()
          .then(() =>
            res.status(201).send({ message: "user saved in db successfully" })
          )
          .catch(() => {
            console.log("error");
          });
      });
    }
  });
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(206).send("A feild is missing try again");
  }
  const response = await mySchemaData.findOne({ email: email });
  if (response) {
    // for comparing passwords
    const passCompare = await bcrypt.compare(password, response.password);
    if (!passCompare) {
      return res
        .status(206)
        .send(
          "Hey you forgot your password let's think together & then we can sign in"
        );
    }
    // we have jwt imported and my own create token jwtToken imported
    // in params
    // we assinged to response.id to and id and given our id next
    const token = jwt.sign({ id: response.id }, jwtToken);
    const { _id, name, email, userName } = response;
    if (token) {
      return res
        .status(200)
        .json({
          message: "User SignIn SuccessFully",
          token: token,
          user: { _id, name, email, userName },
        });
    }
  }
  if (!response) {
    return res
      .status(206)
      .send("Please signup for registration then we can signin");
  }
});
module.exports = router;
