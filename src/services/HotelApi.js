import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class HotelApi extends AuthenticatedApi {
  getHotelsByUser(bypass) {
    return api.get(`/hotels${bypass ? "/1" : ""}`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
