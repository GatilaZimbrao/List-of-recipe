import Api from "../api";
import UserHelper from "../Helpers/UserHelper";

const RecipeService = {
  postRecipe: async (body) => {
    await Api.instance.post("http://localhost:3333/post-recipe", body, {
      headers: { authorization: `Bearer ${UserHelper.getSession().token}` },
    });
  },

  editRecipe: async (body, id) => {
    await Api.instance.put(`http://localhost:3333/edit-recipe/${id}`, body, {
      headers: { authorization: `Bearer ${UserHelper.getSession().token}` },
    });
  },
  removeRecipe: async (id) => {
    await Api.instance.delete(`http://localhost:3333/remove-recipe/${id}`, {
      headers: { authorization: `Bearer ${UserHelper.getSession().token}` },
    });
  },

  getRecipeInfo: async (recipeId) => {
    const response = await Api.instance.get(
      `http://localhost:3333/get-recipe-info/${recipeId}`,
      { headers: { authorization: `Bearer ${UserHelper.getSession().token}` } }
    );
    return response;
  },
  getRecipeList: async () => {
    const response = await Api.instance.get(
      `http://localhost:3333/get-recipe-list`,
      { headers: { authorization: `Bearer ${UserHelper.getSession().token}` } }
    );
    return response;
  },

  searchRecipe: async (searchTerm) => {
    const response = await Api.instance.get(
      `http://localhost:3333/search-recipe?searchTerm=${searchTerm}`,
      { headers: { authorization: `Bearer ${UserHelper.getSession().token}` } }
    );
    return response;
  },
};

export default RecipeService;
