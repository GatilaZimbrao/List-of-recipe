import React, { useEffect, useState } from "react";
import { FaSearch, FaTrashAlt, FaPencilAlt, FaRegEye } from "react-icons/fa";
import { ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";
import "./style.css";
import RecipeService from "../../Service/RecipeService";
import { useHistory } from "react-router";
import UserHelper from "../../Helpers/UserHelper";

export default function RecipeListComponent() {
  const [recipeList, setRecipeList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!UserHelper.isLogged()) {
      return <></>;
    }
    getAllRecipe();
  }, []);

  const getAllRecipe = async () => {
    RecipeService.getRecipeList().then((response) => {
      setRecipeList(response.data);
    });
  };

  const searchRecipe = (searchTerm) => {
    RecipeService.searchRecipe(searchTerm).then((response) => {
      setRecipeList(response.data);
    });
  };

  const navToRecipe = (id) => {
    history.push(`/recipe/${id}`, { id });
  };

  const navToEditRecipe = (id) => {
    history.push(`/edit-recipe/${id}`, { id });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const removeRecipe = (id) => {
    RecipeService.removeRecipe(id).then(() => {
      refreshPage();
    });
  };

  return (
    <div
      className={"recipeList d-flex justify-content-center align-items-center"}
      style={{ minHeight: "86.7vh" }}
    >
      <h1 className="recipeList--title text-center ">Lista de Receitas</h1>
      <div className="recipeList--searchBar">
        <InputGroup className="recipeList--searchBar-input">
          <FormControl
            size="lg"
            placeholder="Pesquisar"
            aria-label="Pesquisar"
            onChange={(e) => searchRecipe(e.target.value)}
          />
          <FaSearch className="recipeList--searchBar-icon" size={"22px"} />
        </InputGroup>
      </div>
      <ListGroup className="recipeList--list-container">
        {recipeList.map((el) => {
          return (
            <ListGroup.Item className="recipeList--list-item" key={el.id}>
              <span className="recipeList--list-item--text">{el.nome}</span>
              <div className="recipeList--list-item--actions">
                <button
                  className="recipeList--list-item--actions-link"
                  onClick={() => {
                    navToRecipe(el.id);
                  }}
                >
                  <FaRegEye />
                </button>
                <button
                  className="recipeList--list-item--actions-link"
                  onClick={() => {
                    navToEditRecipe(el.id);
                  }}
                >
                  <FaPencilAlt />
                </button>

                <button
                  className="recipeList--list-item--actions-link"
                  onClick={() => {
                    removeRecipe(el.id);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Button
        variant="primary"
        href="/recipe-register"
        style={{ marginTop: "15px" }}
      >
        Criar Receita
      </Button>
    </div>
  );
}
