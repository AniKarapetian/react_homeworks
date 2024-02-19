import React, { FC } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { routes } from "../../route/routes";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/login/actions";

const MenuNavbar: FC = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          {routes.map(({ path, name }, index) => (
            <Nav.Link href={path} key={index}>
              {name}
            </Nav.Link>
          ))}
        </Nav>
        <Nav>{/* <Nav.Link onClick={onLogout}>Logout</Nav.Link> */}</Nav>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
