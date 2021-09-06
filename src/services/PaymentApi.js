import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class PaymentApi extends AuthenticatedApi {
  postBookTicket(body) {
    return api.post("/reservation", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  postConfirmPayment(body, bookindId) {
    return api.post(`/reservation/${bookindId}/payment`, body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
