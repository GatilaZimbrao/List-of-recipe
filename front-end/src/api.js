import axios from "axios";

export default class Api {
  static get instance() {
    return this._api
      ? this._api
      : (this._api = axios.create({ baseURL: this.baseURL }));
  }
}
