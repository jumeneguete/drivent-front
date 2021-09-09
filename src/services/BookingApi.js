import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class BookingApi extends AuthenticatedApi {
  postBooking(body) {
    return api.post("/booking", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getBookTicketByEnrollmentId(enrollmentId) {
    return api.get(`/booking/${enrollmentId}/find`, {
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
