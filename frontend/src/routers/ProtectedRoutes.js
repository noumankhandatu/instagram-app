import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import CreatePost from "../pages/createpost";
import Home from "../pages/home";
import Profile from "../pages/profile";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

const ProtectedRoutes = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {["/", "/home", "*"].map((path) => (
          <Route exact path={path} element={<Home />} />
        ))}
        <Route exact path={"/profile"} element={<Profile />} />
        <Route exact path={"/createPost"} element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default ProtectedRoutes;
