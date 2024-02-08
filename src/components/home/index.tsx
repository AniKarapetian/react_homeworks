import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/login/actions";

export const Home: FC = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
