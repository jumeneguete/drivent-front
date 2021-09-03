import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class HotelApi extends AuthenticatedApi {
  getHotelsByUser() {
    return api.get("/hotels", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
