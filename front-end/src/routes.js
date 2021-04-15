import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ViewRecipe from "./pages/ViewRecipe";
import RegisterRecipe from "./pages/RegisterRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeList from "./pages/RecipeList";
import UserService from "./Service/UserService";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />
        <Route path="/logout" exact component={UserService.logoutUser} />
        <Route path="/recipe/:id" exact component={ViewRecipe} />
        <Route path="/recipe-register" exact component={RegisterRecipe} />
        <Route path="/edit-recipe/:id" exact component={EditRecipe} />
        <Route path="/recipe-list" exact component={RecipeList} />
      </Switch>
    </BrowserRouter>
  );
}
