import React, { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
export const Home: FC = () => {
  const user = useSelector(userSelector);
  return (
    <div>
      <h2>Hi {user ? `${user.name} ${user.lastname}` : ""}</h2>
    </div>
  );
};
