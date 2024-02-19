import React, { FC } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";

import { useSelector } from "react-redux";
import { loginSelector } from "../../store/login/login-selector";
import { routes } from "../../route/routes";
import MenuNavbar from "../navbar/Navbar";
import { Container } from "react-bootstrap";

const App: FC = () => {
  const isLoggedIn = useSelector(loginSelector);
  return (
    <BrowserRouter>
      <MenuNavbar />
      <Container>
        <Routes>
          {routes.map(({ path, Component }, index) => {
            return <Route path={path} element={<Component />} key={index} />;
          })}

          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
