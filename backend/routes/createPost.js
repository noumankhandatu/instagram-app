const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const myPOST = mongoose.model("myPOST");

router.get("/allposts", requireLogin, async (req, res) => {
  const getPosts = await myPOST
    .find()
    // this will get alot of data from database
    .populate("postedBy", "_id name")
    .catch((err) => console.log("get post error"));
  res.status(200).json(getPosts);
});

router.post("/createPost", requireLogin, async (req, res) => {
  const { picture, caption } = req.body;
  if (picture === undefined || caption === undefined) {
    return res
      .status(206)
      .send("Image or  Caption is missing please fill fill all fields");
  }
  if (!picture || !caption) {
    return res.status(206).send("Please add all the fields");
  }
  const post = new myPOST({
    picture,
    caption,
    postedBy: req.user,
  });

  const savingPostData = await post.save();
  if (savingPostData) {
    return res
      .status(200)
      .send("Congrat's Post been created Let`s see our post ... ! 🦄  ");
  }
  if (!savingPostData) {
    return res.send("something wrong");
  }
});

router.get("/myposts", requireLogin, async (req, res) => {
  const myPosts = await myPOST
    .find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .catch((err) => {
      console.log("error");
    });
  return res.status(201).json({ myPosts });
});
router.put("/like", requireLogin, async (req, res) => {
  myPOST
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(206).json("error in likes");
      } else {
        res.json(result);
      }
    });
});
router.put("/unlike", requireLogin, async (req, res) => {
  myPOST
    .findByIdAndUpdate(
      req.body.postId,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(206).json("error in likes");
      } else {
        res.json(result);
      }
    });
});
// we have to export routers like this if seperate page
module.exports = router;
