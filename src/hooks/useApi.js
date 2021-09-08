import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/EnrollmentApi";
import HotelApi from "../services/HotelApi";
import ActivitiesApi from "../services/ActivitiesApi";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cep: new CepApi(),
    activities: new ActivitiesApi(),
    enrollment: new EnrollmentApi(),
    hotel: new HotelApi()
  };
}
