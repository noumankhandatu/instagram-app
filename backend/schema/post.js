const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mySchemaData = require("./index");
const postSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "mySchemaData",
  },
  likes: [
    {
      type: ObjectId,
      ref: "mySchemaData",
    },
  ],
});

mongoose.model("myPOST", postSchema);
