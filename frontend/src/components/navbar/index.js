import React from "react";
import logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { tokenAction } from "../../redux/tokenSlice";
import { toast } from "react-toastify";
import Modal from "../modal";

export default function Navbar() {
  const auth = useSelector((state) => state.tokenSlice);
  const token = localStorage.getItem("jwtToken");
  // logout
  const dispatch = useDispatch();
  const handleLogOut = () => {
    if (auth || token) {
      // localStorage.removeItem("jwtToken");
      // dispatch(tokenAction(null));
      // alert("Take Care you are log out");
      setModalOpen(true);
    }
  };

  const [openModal, setModalOpen] = React.useState(false);
  return (
    <div className="navbar">
      {openModal ? <Modal setModalOpen={setModalOpen} /> : null}
      <Link to="/">
        <img src={logo} className="img" alt="" />
      </Link>
      <ul className="nav-menu">
        <>
          {auth || token ? (
            <>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <Link to="/createPost">Create Post</Link>
              <button className="primaryBtn" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <li>SignUp</li>
              </Link>
              <Link to="/signin">
                <li>SignIn</li>
              </Link>
            </>
          )}
        </>
      </ul>
    </div>
  );
}
