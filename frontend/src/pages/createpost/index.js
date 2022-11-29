import React, { useState } from "react";
import { Fab, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";

export default function Createpost() {
  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  const [caption, setCaption] = useState();
  const [image, setImage] = React.useState("");
  const [imageUrl, setImageUrl] = useState();
  const handleCaption = (e) => {
    setCaption(e.target.value);
  };
  React.useEffect(() => {
    // saving post to mongodb
    if (imageUrl) {
      const handleCreatePost = async () => {
        const BEndResp = await axios({
          method: "post",
          url: "http://localhost:9000/createPost",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          data: {
            picture: imageUrl,
            caption: caption,
          },
        }).catch((err) => {
          console.log("error");
        });
        console.log(BEndResp);
        if (BEndResp) {
          toast(BEndResp.data);
        }
        if (!BEndResp) {
          return toast.warning(
            "Something isnt working while saving image-url in database"
          );
        }
      };
      handleCreatePost();
    }
  }, [imageUrl]);
  const handleCloud = async () => {
    const fd = new FormData();
    fd.append("file", image);
    fd.append("upload_preset", "noumancloud");
    fd.append("cloud_name", "noumancloud");
    // sending images url to cloudinary
    const res = await axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/noumancloud/image/upload",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: fd,
    }).catch((err) => {
      toast.warning("Something isnt working while saving file in cloudinary");
    });
    if (res) {
      setImageUrl(res.data.url);
      toast.success("image saved in cloudinary");
    }
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <Paper elevation={5} className="createPost">
        {/* //header */}
        <div className="post-header">
          <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        </div>
        {/* image preview */}
        <div className="main-div">
          <img
            id="output"
            className="mtb"
            style={{ width: "100%" }}
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
              setImage(event.target.files[0]);
            }}
          />
        </div>
        {/* details */}
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <h5 style={{ letterSpacing: "1px" }} className="mtb">
              又名數據使用
            </h5>
          </div>
          <Box sx={{ display: "flex" }}>
            <textarea
              onChange={(e) => handleCaption(e)}
              type="text"
              placeholder="Write a caption...."
            ></textarea>
            <Fab size="small" color="primary" aria-label="add">
              <SendIcon onClick={handleCloud} />
            </Fab>
          </Box>
        </div>
      </Paper>
    </div>
  );
}
