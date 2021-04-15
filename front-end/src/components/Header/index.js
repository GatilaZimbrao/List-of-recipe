import React from "react";
import logoRg from "../../assets/img/logo-RG-Sistemas.png";
import logoRgMobile from "../../assets/img/logo-RG-Sistemas-mobile.png";
import { FaUserAlt } from "react-icons/fa";
import "./style.css";
import UserHelper from "../../Helpers/UserHelper";

export default function Header() {
  const session = UserHelper.getSession();

  return (
    <header className="header">
      <div className="header-container">
        <div className=" text-left">
          <a href="/">
            <img
              className="header-container--img-desktop"
              style={{ width: "185px" }}
              src={logoRg}
              alt="Logo"
            ></img>
            <img
              className="header-container--img-mobile"
              style={{ width: "50px" }}
              src={logoRgMobile}
              alt="Logo"
            ></img>
          </a>
        </div>
        <div className=" header--title-container">
          <h1 className="header--title-content ">
            desafio rg receitas culinarias
          </h1>
        </div>
        <div className=" header--login-container">
          {session ? (
            <a className={"header--login-link"} href="/logout">
              <FaUserAlt className={"header--login-icon"} />
              <span className="header--login-text">Sair</span>
            </a>
          ) : (
            <a className={"header--login-link"} href="/login">
              <FaUserAlt className={"header--login-icon"} />
              <span className="header--login-text">
                Entre <br />
                ou Cadastre-se
              </span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
