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

  getAllActivities() {
    return api.get("/activities", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getActivitiesOfTheDay(date) {
    return api.get(`/activities/date/${date}`, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  postActivityEnrollment(body) {
    return api.post("/activities/enroll", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
