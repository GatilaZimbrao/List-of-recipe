import React from "react";
import { Nav } from "react-bootstrap";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import "./style.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="col-9 text-left">Gabriel Átila Zimbrão Nogueira</div>
        <Nav className="col-3 footer--links-container">
          <Nav.Link
            href="https://www.linkedin.com/in/gabriel-%C3%A1tila-zimbr%C3%A3o-a642831a5/"
            target="_blank"
            style={{ marginRight: "8px", padding: 0, color: "#212529" }}
          >
            <FaLinkedinIn size={"25px"} color={"#fff"} />
          </Nav.Link>

          <Nav.Link
            href="https://github.com/GatilaZimbrao"
            target="_blank"
            style={{ marginRight: "8px", padding: 0, color: "#212529" }}
          >
            <FaGithub size={"25px"} color={"#fff"} />
          </Nav.Link>
        </Nav>
      </div>
    </footer>
  );
}
