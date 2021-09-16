import EventApi from "../services/EventApi";
import UserApi from "../services/UserApi";
import AuthApi from "../services/auth";
import CepApi from "../services/CepApi";
import EnrollmentApi from "../services/EnrollmentApi";
import HotelApi from "../services/HotelApi";
import ActivitiesApi from "../services/ActivitiesApi";
import RoomApi from "../services/RoomApi";
import BookingRoomApi from "../services/BookingRoomApi";
import PaymentApi from "../services/PaymentApi";
import BookingApi from "../services/BookingApi";
import CertificateApi from "../services/CertificateAPI";

export default function useApi() {
  return {
    event: new EventApi(),
    user: new UserApi(),
    auth: new AuthApi(),
    cep: new CepApi(),
    activities: new ActivitiesApi(),
    enrollment: new EnrollmentApi(),
    room: new RoomApi(),
    bookingRoom: new BookingRoomApi(),
    booking: new BookingApi(),
    payment: new PaymentApi(),
    hotel: new HotelApi(),
    certificate: new CertificateApi()
  };
}
