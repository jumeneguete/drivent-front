import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Button from "../Form/Button";

import EachHotel from "./EachHotel";
import roomsAvailable from "./roomsAvailable";
import Rooms from "./Rooms";

export default function Accommodation({ hotels }) {
  const [rooms, setRooms] = useState([]);
  const [chosenHotel, setChosenHotel] = useState(null);
  const [chosenRoom, setChosenRoom] = useState(null);
  
  useEffect(() => {
    if (chosenHotel) {
      const rooms = roomsAvailable();
      setRooms(rooms);
    }
  }, [chosenHotel]);

  return (
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
            <EachHotel key={n.id} hotelInformation={n} />
          </StyledButton>
        ))}
      </HotelContainer>
      <StyledTypography variant="h6" type={"roomChoice"} hidden={!chosenHotel}>
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
  > button {
    margin: 0 19px 0 0 !important;
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
