import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class PaymentApi extends AuthenticatedApi {
  postBookTicket(body) {
    return api.post("/booking", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  postConfirmPayment(bookindId) {
    return api.post(`/booking/${bookindId}/payment`, {}, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getPaymentConfirmation(enrollmentId) {
    return api.get(`/booking/${enrollmentId}/find`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
