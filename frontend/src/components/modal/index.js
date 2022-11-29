import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { tokenAction } from "../../redux/tokenSlice";
import "./style.css";

export default function Modal({ setModalOpen }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.tokenSlice);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const handleLogOut = () => {
    setModalOpen(false);
    toast.success("Take Care you are log out");
    dispatch(tokenAction(null));
    localStorage.removeItem("jwtToken");
    navigate("/");
  };
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <CloseIcon />
          </button>
          {/* modal content */}
          <div className="modalContent">Are you really want to log Out ?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="logOutBtn" onClick={handleLogOut}>
                Log Out
              </button>

              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
