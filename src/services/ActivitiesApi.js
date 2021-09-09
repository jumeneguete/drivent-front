import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ActivitiesApi extends AuthenticatedApi {
  getEventDays() {
    return api.get("/activities/dates", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
