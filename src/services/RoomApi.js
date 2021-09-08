import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class RoomApi extends AuthenticatedApi {
  getRoomsByHotel(hotelId) {
    return api.get(`/rooms/${hotelId}`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
