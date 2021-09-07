import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class BookingRoomApi extends AuthenticatedApi {
  book(roomId) {
    return api.post(
      "/booking-room",
      { roomId },
      {
        headers: {
          ...this.getAuthorizationHeader(),
        },
      }
    );
  }
}
