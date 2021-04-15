import Api from "../api";
import UserHelper from "../Helpers/UserHelper";

const CategoryService = {
  getCategoryInfo: async (categoryId) => {
    const response = await Api.instance.get(
      `http://localhost:3333/category/${categoryId}`,
      { headers: { authorization: `Bearer ${UserHelper.getSession().token}` } }
    );
    return response;
  },
  getCategoryList: async () => {
    const response = await Api.instance.get(
      `http://localhost:3333/all-category`,
      { headers: { authorization: `Bearer ${UserHelper.getSession().token}` } }
    );
    return response;
  },
};

export default CategoryService;
