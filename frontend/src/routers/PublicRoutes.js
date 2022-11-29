import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/navbar";
import CreatePost from "../pages/createpost";
import Home from "../pages/home";
import Profile from "../pages/profile";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";

const PublicRoutes = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {["/", "/*"].map((path) => (
          <Route exact path={path} element={<SignIn />} />
        ))}
        <Route exact path={"/signin"} element={<SignIn />} />
        <Route exact path={"/signup"} element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default PublicRoutes;
