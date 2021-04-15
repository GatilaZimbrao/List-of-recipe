import Api from "../api";
import UserHelper from "../Helpers/UserHelper";

const UserService = {
  getUser: async (login) => {
    const response = await Api.instance
      .get(`http://localhost:3333/get-user/${login}`)
      .then((response) => {
        return response;
      });

    return response;
  },

  createUser: async (body) => {
    await Api.instance.post("http://localhost:3333/user", body).then(() => {
      window.location.href = "/login";
    });
  },
  userLogin: async (body) => {
    await Api.instance
      .post("http://localhost:3333/login", body)
      .then((response) => {
        UserHelper.setSession(response.data, body.Login);
        window.location.href = "/recipe-list";
      });
  },
  logoutUser: () => {
    UserHelper.delSession();
    window.location.href = "/";
  },
};

export default UserService;
