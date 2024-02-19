import React, { ChangeEvent, useState } from "react";
import { LoginData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../store/login/actions";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { Button, Container } from "react-bootstrap";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      setError("Please enter both email and password");
      return;
    }
    setData({
      email: "",
      password: "",
    });
    const err = await signIn(data);
    if (err) {
      setError(err);
      return;
    }

    navigate("/");
    setError("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text>Username</InputGroup.Text>
          <Form.Control
            type="email"
            value={data.email}
            name="email"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Password</InputGroup.Text>
          <Form.Control
            type="password"
            value={data.password}
            name="password"
            onChange={handleChange}
          />
        </InputGroup>
        <Button type="button" onClick={handleLogin} variant="success">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
