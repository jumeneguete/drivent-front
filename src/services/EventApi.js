import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class EventApi extends AuthenticatedApi {
  getEventInfo() {
    return api.get("/event");
  }
}
