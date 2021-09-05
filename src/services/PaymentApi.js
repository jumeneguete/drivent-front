import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class PaymentApi extends AuthenticatedApi {
  postBookTicket(body) {
    return api.post("/payments", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  postConfirmPayment(body) {
    return api.post("/payments/confirm", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
