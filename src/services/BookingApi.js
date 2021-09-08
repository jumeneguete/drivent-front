import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class BookingApi extends AuthenticatedApi {
  postBookTicket(body) {
    return api.post("/booking", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getHotelOptions() {
    return api.get("/hotel-options", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getTicketOptions() {
    return api.get("/ticket-options", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
