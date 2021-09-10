import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Button from "../../../Form/Button";
import { toast } from "react-toastify";

import Rooms from "./Rooms";
import useApi from "../../../../hooks/useApi";
import mediaQueries from "../../../../mediaQueries";
import BookingHotel from "./BookingHotel";
import Hotel from "./Hotel";

export default function Accommodation({
  hasBookedRoom,
  setHasBookedRoom,
  setHotels,
  hotels,
}) {
  const api = useApi();

  const [rooms, setRooms] = useState([]);
  const [chosenHotel, setChosenHotel] = useState(null);
  const [chosenRoom, setChosenRoom] = useState(null);
  const [bookedRoom, setBookedRoom] = useState([]);

  useEffect(() => {
    if (chosenHotel) {
      api.room.getRoomsByHotel(chosenHotel).then(({ data }) => {
        setRooms(data);
      });
    }
  }, [chosenHotel]);

  function submitRoomSelection() {
    api.bookingRoom
      .book(chosenRoom)
      .then(({ data }) => {
        console.log(data);
        setBookedRoom(data);
        setHasBookedRoom(true);
        setRooms([]);
        setChosenHotel(null);
        setChosenRoom(null);
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);

        const details = error.response.data?.details;
        console.log(error.response);
        if (error.response && error.response.details) {
          for (const detail of details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível reservar o quarto!");
        }
      });
  }

  return (
    <>
      {hasBookedRoom ? (
        <BookingHotel
          setHasBookedRoom={setHasBookedRoom}
          setHotels={setHotels}
          hotel={bookedRoom}
        />
      ) : (
        <>
          <StyledTypography variant="h6" type={"hotelChoice"}>
            Primeiro, escolha seu hotel
          </StyledTypography>
          <HotelContainer>
            {hotels.map((n) => (
              <StyledButton
                onClick={() => setChosenHotel(n.id)}
                state={chosenHotel === n.id ? 1 : 0}
                key={n.id}
              >
                <Hotel key={n.id} hotelInformation={n} />
              </StyledButton>
            ))}
          </HotelContainer>
          <StyledTypography
            variant="h6"
            type={"roomChoice"}
            hidden={!chosenHotel}
          >
            Ótima pedida! Agora escolha seu quarto:
          </StyledTypography>
          <RoomsContainer hidden={!chosenHotel}>
            {rooms.map((room) => (
              <Rooms
                key={room.id}
                roomInformation={room}
                setChosenRoom={setChosenRoom}
                chosenRoom={chosenRoom}
              />
            ))}
          </RoomsContainer>
          {chosenRoom ? (
            <SubmitRoomSelection onClick={submitRoomSelection}>
              Reservar Quarto
            </SubmitRoomSelection>
          ) : null}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin: ${(props) =>
    props.type === "roomChoice" ? "52px 0 33px 0" : "36px 0"}!important;
  margin-bottom: 20px !important;
  color: ${(props) => (props.variant === "h6" ? "#8E8E8E" : null)}!important;
`;

const HotelContainer = styled.div`
  width: 100% !important;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 19px;

  ${mediaQueries.ipad} {
    justify-content: center;
  }

  > button {
    box-shadow: none;
    padding: 14px 16px 0px 16px !important;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${(props) =>
    props.state ? "#FFEED2" : "#f1f1f1"}!important;
`;

const RoomsContainer = styled.div`
  width: 100% !important;
  align-items: center;
  justify-content: space-between;
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-wrap: wrap;
  > button {
    width: calc(25% - 10px);
    box-shadow: none;
    border-radius: 10px;
    border: 1px solid #cecece;
    margin-bottom: 8px;
  }
`;

const SubmitRoomSelection = styled(Button)`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25) !important;
  margin: 46px 0 !important;
`;
