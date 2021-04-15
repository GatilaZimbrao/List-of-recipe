import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./style.css";
import RecipeService from "../../Service/RecipeService";
import { useHistory } from "react-router";
import CategoryService from "../../Service/CategoryService";
import UserHelper from "../../Helpers/UserHelper";

export default function RegisterRecipeComponent() {
  const [Name, setName] = useState("");
  const [PreparationTime, setPreparationTime] = useState(0);
  const [Servings, setServings] = useState(0);
  const [MethodOfPreparation, setMethodOfPreparation] = useState("");
  const [Ingredients, setIngredients] = useState("");
  const [Category, setCategory] = useState(0);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (!UserHelper.isLogged()) {
      return <></>;
    }
    getCategoriesList();
  }, []);

  const getCategoriesList = async () => {
    CategoryService.getCategoryList().then((response) => {
      setCategoryList(response.data);
    });
  };

  const postRecipe = async (body) => {
    RecipeService.postRecipe(body).then(() => {
      NavToRecipeList();
    });
  };
  const NavToRecipeList = () => {
    history.push(`/recipe-list`);
  };

  const handleRegisterRecipe = async (event) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const body = {
        Category,
        Name,
        PreparationTime,
        Servings,
        MethodOfPreparation,
        Ingredients,
      };

      postRecipe(body);
    }
    setValidated(true);
  };

  return (
    <div
      className={
        "registerRecipe d-flex justify-content-center align-items-center"
      }
      style={{ padding: "25px", paddingBottom: "75px", minHeight: "86.7vh" }}
    >
      <Form noValidate validated={validated} onSubmit={handleRegisterRecipe}>
        <h1 className="registerRecipe--title text-center ">
          Cadastrar Receita
        </h1>
        <Row>
          <Col lg={12}>
            <Form.Group>
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Nome da Receita
              </Form.Label>
              <Form.Control
                required
                maxLength={45}
                type="text"
                placeholder="Nome"
                size="lg"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group>
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Tempo de Preparo ( minutos )
              </Form.Label>
              <Form.Control
                required
                maxLength={3}
                type="number"
                placeholder="0"
                size="lg"
                value={PreparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group>
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Rende quantas porções
              </Form.Label>
              <Form.Control
                required
                maxLength={3}
                type="number"
                placeholder="0"
                size="lg"
                value={Servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col lg={12}>
            <Form.Label style={{ width: "100%", textAlign: "left" }}>
              Categoria
            </Form.Label>
            <Form.Control
              as="select"
              required
              placeholder="Select"
              size="lg"
              style={{ marginBottom: "1rem" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled>Selecione a categoria:</option>;
              {CategoryList.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.nome}
                  </option>
                );
              })}
            </Form.Control>
          </Col>

          <Col lg={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Lista de Ingredientes
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                maxLength={1000}
                type="text"
                placeholder="Separar os ingredientes com ponto e virgula ( ; )"
                size="lg"
                value={Ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col lg={12}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ width: "100%", textAlign: "left" }}>
                Modo de Preparo
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                maxLength={3000}
                type="text"
                placeholder="Separar os passos com ponto e virgula ( ; )"
                size="lg"
                value={MethodOfPreparation}
                onChange={(e) => setMethodOfPreparation(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center d-flex flex-end">
          <Button variant="success" size="lg" className="m-1" type="submit">
            Registrar <FaCheck />
          </Button>
        </div>
      </Form>
    </div>
  );
}
