import React from "react";
import logo from "../../assets/image/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function SignUp() {
  const emailRegix = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegix =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const navigate = useNavigate();
  const [getVal, setVal] = React.useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const headers = {
    "Content-Type": "application/json",
  };
  const HandleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal({ ...getVal, [name]: value });
  };

  const handleSubmit = async () => {
    if (!emailRegix.test(getVal.email)) {
      toast("enter a valid email");
      return;
    }
    if (!passRegix.test(getVal.password)) {
      toast(
        "password contain 8 letter including , uper and lower letter and special character"
      );
      return;
    }
    const res = await axios.post("http://localhost:9000/signup", getVal, {
      headers,
    });
    if (res) {
      toast(res.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (res.status === 200) {
      navigate("/signin");
    }
  };
  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="" />
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends
          </p>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) => HandleOnChange(e)}
            />
          </div>
          <div className={"mtb"}>
            <input
              type="text"
              name="userName"
              placeholder="UserName"
              onChange={(e) => HandleOnChange(e)}
            />
          </div>
          <div className={"mtb"}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => HandleOnChange(e)}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              placeholder="Password"
              onChange={(e) => HandleOnChange(e)}
            />
          </div>
          <div
            className="loginPara mtb"
            style={{ fontSize: "12px", textAlign: "center" }}
          >
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </div>
          <div className={"mtb"}>
            <input
              type="submit"
              onClick={handleSubmit}
              id="submit-btn"
              value="Sign Up"
            />
          </div>
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
