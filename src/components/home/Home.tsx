import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { stack } from "../../providers/stack-provider";
export const Home: FC = () => {
  const user = useSelector(userSelector);

  useEffect(() => {
    stack.push(1);
    stack.push(2);
    stack.push(8);
    stack.push(62);
    stack.push(28);
    console.log("stack", stack);
    console.log("size", stack.size());
    console.log("max", stack.getMax());
  });

  return (
    <div>
      <h2>Hi {user ? `${user.name} ${user.lastname}` : ""}</h2>
    </div>
  );
};
