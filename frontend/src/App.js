import React, { useEffect, useState } from "react";
import ProtectedRoutes from "./routers/ProtectedRoutes";
import PublicRoutes from "./routers/PublicRoutes";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function App() {
  const auth = useSelector((state) => state.tokenSlice);
  const token = localStorage.getItem("jwtToken");
 
  return <>{auth || token ? <ProtectedRoutes /> : <PublicRoutes />}</>;
}

export default App;
