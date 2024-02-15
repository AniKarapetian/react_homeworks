import React, { FC } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";

import { useSelector } from "react-redux";
import { loginSelector } from "../../store/login/login-selector";
import { routes } from "../../route/routes";

const App: FC = () => {
  const isLoggedIn = useSelector(loginSelector);
  return (
    <BrowserRouter>
      <nav>
        <ul>
          {routes.map(({ path, name }, index) => {
            return (
              <li key={index}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Routes>
        {routes.map(({ path, Component }, index) => {
          return <Route path={path} element={<Component />} key={index} />;
        })}

        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
