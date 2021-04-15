import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Form, Button, Col } from "react-bootstrap";
import "./style.css";
import UserService from "../../Service/UserService";

export default function SignInComponent() {
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const userLogin = async (body) => {
    UserService.userLogin(body).then(() => {});
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const body = {
        Login,
        Password,
      };
      userLogin(body);
    }
    setValidated(true);
  };

  return (
    <div
      className="signIn d-flex justify-content-center align-items-center"
      style={{ padding: "25px", paddingBottom: "75px", minHeight: "86.7vh" }}
    >
      <Form
        style={{ width: "350px" }}
        noValidate
        validated={validated}
        onSubmit={handleLogin}
      >
        <h1 className="signIn--title text-center">Login</h1>
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Control
              required
              type="text"
              placeholder="Login"
              value={Login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Informe o Login.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Informe a Senha.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <div className="d-flex flex-end">
          <Button
            variant="primary"
            size="sm"
            href="/register"
            style={{ marginRight: "5px" }}
          >
            Cadastrar
          </Button>
          <Button type="submit" variant="success" size="sm">
            Entrar <FaArrowRight />
          </Button>
        </div>
      </Form>
    </div>
  );
}
