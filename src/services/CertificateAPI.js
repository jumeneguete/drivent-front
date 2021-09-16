import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class CertificateApi extends AuthenticatedApi {
  get() {
    return api.get("/certificate", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
