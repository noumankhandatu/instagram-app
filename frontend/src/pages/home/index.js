import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Button, CardActionArea, Paper, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";

export default function Home() {
  const [allPosts, setAllPosts] = React.useState([]);
  const [liked, setLiked] = React.useState(false);
  // fetching all post from database
  const fetchAllPosts = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:9000/allposts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).catch((err) => {
      console.log("error while fetching all posts");
    });
    if (res) {
      setAllPosts(res.data);
    }
  };
  const handleLikes = (id) => {
    setLiked(!liked);
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);
  return (
    <div className="home">
      {/* card */}
      {allPosts &&
        allPosts.map((items, id) => {
          const { caption, picture, postedBy } = items;
          return (
            <Paper elevation={3} className="card" key={id}>
              {/* card header */}
              <div className="card-header">
                <div className="card-pic">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe4VxMjW2zQNTo6oTonyVqCu628yXUNOhRVUU3JzaU_g&s"
                    alt=""
                  />
                </div>
                <h2 style={{ letterSpacing: "1px" }}>{postedBy.name}</h2>
              </div>
              {/* card image */}
              <div className="card-image">
                <img src={picture} alt="" />
              </div>

              {/* card content */}
              <div className="card-content ">
                <CardActionArea
                  onClick={() => handleLikes(id)}
                  sx={{
                    textAlign: "center",
                    width: "10%",
                    borderRadius: "100%",
                    color: "red",
                    padding: "10px",
                  }}
                >
                  {liked ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "black" }} />
                  )}
                </CardActionArea>
                <p className="mtb"> {liked ? " You liked a post" : ""} </p>
                <p style={{ marginTop: "30px", marginBottom: "30px" }}>
                  {caption}
                </p>
              </div>

              {/* add Comment */}
              <div
                className="add-comment"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <SentimentSatisfiedAltIcon />
                <input type="text" placeholder="Add a comment" />
                <Button variant="contained" size="small">
                  <Typography variant="">Post</Typography>
                </Button>
              </div>
            </Paper>
          );
        })}
    </div>
  );
}
