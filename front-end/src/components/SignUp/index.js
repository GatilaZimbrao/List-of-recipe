import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import "./style.css";
import UserService from "../../Service/UserService";

export default function SignUpComponent() {
  const [Name, setName] = useState("");
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const createUser = async (body) => {
    UserService.createUser(body).then(() => {});
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const body = {
        Name,
        Login,
        Password,
      };
      createUser(body);
    }
    setValidated(true);
  };

  return (
    <div
      className={"signUp d-flex justify-content-center align-items-center"}
      style={{ padding: "25px", paddingBottom: "75px", minHeight: "86.7vh" }}
    >
      <Form noValidate validated={validated} onSubmit={handleSignUp}>
        <h1 className="signUp--title text-center">Casdastre-se</h1>
        <Row>
          <Col lg={12}>
            <Form.Group style={{ display: "flex" }}>
              <Form.Control
                required
                maxLength={44}
                type="text"
                placeholder="Nome"
                size="sm"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Control
                    required
                    type="text"
                    minLength={4}
                    maxLength={20}
                    placeholder="Login"
                    size="sm"
                    value={Login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    required
                    type="password"
                    minLength={4}
                    maxLength={20}
                    placeholder="Password"
                    size="sm"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Row>
              <InputGroup></InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center d-flex flex-end">
          <Button variant="link" href="/login" size="sm">
            Já tenho uma conta!
          </Button>
          <Button variant="success" size="sm" className="m-1" type="submit">
            Cadastrar <FaCheck />
          </Button>
        </div>
      </Form>
    </div>
  );
}
