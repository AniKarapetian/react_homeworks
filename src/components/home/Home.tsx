import React, { FC, useRef } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
export const Home: FC = () => {
  const user = useSelector(userSelector);

  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div>
      <h2>Hi {user ? `${user.name} ${user.lastname}` : ""}</h2>
    </div>
  );
};
