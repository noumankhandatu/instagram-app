import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function Profie() {
  const [getPosts, setPosts] = useState([]);
  const myAllPosts = async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:9000/myposts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).catch((err) => {
      console.log("error in all posts");
    });

    if (res.data.myPosts) {
      setPosts(res.data.myPosts);
    }
  };
  useEffect(() => {
    myAllPosts();
  });

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img
            src={getPosts[0]?.picture ? getPosts[0]?.picture : "loading ..."}
            alt=""
          />
        </div>
        {/* profile-data */}
        <div className="pofile-data">
          <h1>
            {getPosts[0]?.postedBy?.name
              ? getPosts[0]?.postedBy?.name
              : "loading ..."}
          </h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>40 posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {getPosts.map((items, id) => {
          const { picture } = items;
          return <img key={id} src={picture} alt="" />;
        })}
      </div>
    </div>
  );
}
