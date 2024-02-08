import React, { FC } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { User } from "../user";
import { Home } from "../home";
import Todo from "../todo";
import Login from "../login";
import { useSelector } from "react-redux";
import { loginSelector } from "../../store/login/login-selector";

const App: FC = () => {
  const isLoggedIn = useSelector(loginSelector);
  return (
    <BrowserRouter>
      {isLoggedIn && (
        <nav>
          <ul>
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
            <li>
              <Link to={"/todo"}>Todo</Link>
            </li>
            <li>
              <Link to={"/user"}>Users</Link>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        {!isLoggedIn && <Route path="/login" element={<Login />} />}

        {isLoggedIn && <Route path="/" element={<Home />} />}
        {isLoggedIn && <Route path="/home" element={<Home />} />}
        {isLoggedIn && <Route path="/todo" element={<Todo />} />}
        {isLoggedIn && <Route path="/user" element={<User />} />}

        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
