import api from "./api";

export default class UserApi {
  signUp(email, password) {
    return api.post("/users", { email, password });
  }

  requestNewPassword(email) {
    return api.post("/users/reset-password", { email });
  }
}
