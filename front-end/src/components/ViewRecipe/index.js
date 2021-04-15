import React, { useEffect, useState } from "react";
import {
  FaRegClock,
  FaConciergeBell,
  FaDrumstickBite,
  FaClipboardList,
  FaPrint,
} from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { Container, Row, Col } from "react-bootstrap";

import "./style.css";

import RecipeService from "../../Service/RecipeService";
import CategoryService from "../../Service/CategoryService";
import UserHelper from "../../Helpers/UserHelper";

export default function ViewRecipeComponent(props) {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [categoryName, setcategoryName] = useState([]);

  const getCategory = async (categoryId) => {
    CategoryService.getCategoryInfo(categoryId).then((response) => {
      setcategoryName(response.data);
    });
  };

  useEffect(() => {
    if (!UserHelper.isLogged()) {
      return <></>;
    }
    async function fetchData() {
      RecipeService.getRecipeInfo(props.id).then((response) => {
        setRecipeInfo(response.data);
      });
    }
    fetchData();
  }, [props]);

  useEffect(() => {
    if (recipeInfo.id_categorias) {
      getCategory(recipeInfo.id_categorias);
    }
  }, [recipeInfo]);

  return (
    <Container
      className={"viewRecipe d-flex justify-content-center align-items-center"}
      style={{ padding: "25px", paddingBottom: "75px", minHeight: "86.7vh" }}
    >
      <div className="viewRecipe--title-conteiner text-center highlight">
        <h1 className="viewRecipe--title text-center ">{recipeInfo.nome} </h1>
        <button
          className="viewRecipe--print"
          onClick={() => {
            window.print();
          }}
        >
          <FaPrint size={"24px"} />
        </button>
      </div>

      <div className="viewRecipe--content text-center">
        <Row className="viewRecipe--content-row">
          <Col md={4} className="viewRecipe--wrapper viewRecipe--wrapper-time">
            <FaRegClock className="highlight" size={"30px"} />
            <div
              className="viewRecipe--wrapper-content"
              style={{ textTransform: "uppercase" }}
            >
              Preparo:{" "}
              <span className="highlight">
                {recipeInfo.tempo_preparo_minutos} MIN
              </span>
            </div>
          </Col>
          <Col
            md={4}
            className="viewRecipe--wrapper viewRecipe--wrapper-servings"
          >
            <FaConciergeBell className="highlight" size={"30px"} />
            <div
              className="viewRecipe--wrapper-content"
              style={{ textTransform: "uppercase" }}
            >
              Rendimento:
              <span className="highlight"> {recipeInfo.porcoes} PORÇÕES</span>
            </div>
          </Col>
          <Col
            md={4}
            className="viewRecipe--wrapper viewRecipe--wrapper-servings"
          >
            <BiFoodMenu className="highlight" size={"30px"} />
            <div
              className="viewRecipe--wrapper-content"
              style={{ textTransform: "uppercase" }}
            >
              Categoria:
              <span className="highlight"> {categoryName.nome}</span>
            </div>
          </Col>
        </Row>
        <Row className="viewRecipe--content-row">
          <Col
            md={12}
            className="viewRecipe--wrapper viewRecipe--wrapper-ingredients"
          >
            <div className="viewRecipe--ingredients-title">
              <FaDrumstickBite
                className="highlight"
                size={"30px"}
                style={{ marginRight: "10px" }}
              />
              Ingredientes:
            </div>
            <ul className="viewRecipe--ingredients--list-container">
              {recipeInfo.ingredientes &&
                recipeInfo.ingredientes.split(";").map((el) => {
                  return (
                    <li key={el} className="viewRecipe--ingredients--list-item">
                      {el}
                    </li>
                  );
                })}
            </ul>
          </Col>
        </Row>
        <Row className="viewRecipe--content-row">
          <Col
            md={12}
            className="viewRecipe--wrapper viewRecipe--wrapper-preparation"
          >
            <div className="viewRecipe--preparation-title">
              <FaClipboardList
                className="highlight"
                size={"30px"}
                style={{ marginRight: "10px" }}
              />
              Modo de Preparo:
            </div>
            <ul className="viewRecipe--preparation--list-container">
              {recipeInfo.modo_preparo &&
                recipeInfo.modo_preparo.split(";").map((el, i) => {
                  return (
                    <li key={i} className="viewRecipe--preparation--list-item">
                      <span className="viewRecipe--preparation--list-item--count">
                        {i + 1}
                      </span>
                      {el}
                    </li>
                  );
                })}
            </ul>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
