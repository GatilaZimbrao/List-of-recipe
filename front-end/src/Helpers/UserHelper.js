export default class UserHelper {
  static getSession() {
    const session = JSON.parse(localStorage.getItem("session"));
    return session;
  }
  static setSession(token, login) {
    localStorage.setItem(
      "session",
      JSON.stringify({
        authorizedIn: new Date(),
        token: token,
        login: login,
      })
    );
  }
  static delSession() {
    localStorage.removeItem("session");
  }

  static isLogged() {
    if (!this.getSession()) {
      window.location.href = "/login";
      return false;
    }
    return true;
  }
}
