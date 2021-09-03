import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import Button from "../Form/Button";

import EachHotel from "./EachHotel";
import Rooms from "./Rooms";

export default function Accommodation() {
  const hotelsAvailables = [
    {
      id: 1,
      name: "Driven Resort",
      accommodationsType: ["Single", "Double"],
      beds: 103,
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
    },
    {
      id: 2,
      name: "Driven Palace",
      accommodationsType: ["Single", "Double", "Triple"],
      beds: 25,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f7/8b/38/exterior.jpg?w=900&h=-1&s=1",
    },
    {
      id: 3,
      name: "Driven World",
      accommodationsType: ["Single", "Double"],
      beds: 2,
      image:
        "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg",
    },
  ];
  const roomsAvailables = [
    {
      id: 1,
      hotelId: 1,
      name: 101,
      beds: 2,
      guests: [],
    },
    {
      id: 2,
      hotelId: 1,
      name: 102,
      beds: 1,
      guests: [],
    },
    {
      id: 3,
      hotelId: 1,
      name: 103,
      beds: 2,
      guests: [23, 22],
    },
    {
      id: 4,
      hotelId: 1,
      name: 104,
      beds: 2,
      guests: [32],
    },
    {
      id: 1,
      hotelId: 1,
      name: 105,
      beds: 2,
      guests: [],
    },
    {
      id: 2,
      hotelId: 1,
      name: 106,
      beds: 1,
      guests: [],
    },
    {
      id: 3,
      hotelId: 1,
      name: 107,
      beds: 3,
      guests: [23, 22, 21],
    },
    {
      id: 4,
      hotelId: 1,
      name: 108,
      beds: 2,
      guests: [32],
    },
    {
      id: 1,
      hotelId: 1,
      name: 109,
      beds: 2,
      guests: [],
    },
    {
      id: 2,
      hotelId: 1,
      name: 110,
      beds: 1,
      guests: [],
    },
    {
      id: 3,
      hotelId: 1,
      name: 111,
      beds: 2,
      guests: [23, 22],
    },
    {
      id: 4,
      hotelId: 1,
      name: 112,
      beds: 3,
      guests: [32],
    },
  ];
  const [chosenHotel, setChosenHotel] = useState(0);

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>
      <StyledTypography variant="h6" type={"hotelChoice"}>
        Primeiro, escolha seu hotel
      </StyledTypography>
      <HotelContainer>
        {hotelsAvailables.map((n) => (
          <StyledButton
            onClick={() => setChosenHotel(n.id)}
            state={chosenHotel === n.id ? true : false}
          >
            <EachHotel key={n.id} hotelInformation={n} />
          </StyledButton>
        ))}
      </HotelContainer>
      <StyledTypography variant="h6" type={"roomChoice"} hidden={!chosenHotel}>
        Ótima pedida! Agora escolha seu quarto:
      </StyledTypography>
      <RoomsContainer hidden={!chosenHotel}>
        {roomsAvailables.map((n) => (
          <Rooms key={n.id} roomInformation={n} />
        ))}
      </RoomsContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin: ${(props) =>
    props.type === "roomChoice" ? "52px 0 33px 0" : null}!important;
  margin-bottom: 20px !important;
  color: ${(props) => (props.variant === "h6" ? "#8E8E8E" : null)};
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
  display: ${props => props.hidden? "none": "flex"};
  flex-wrap: wrap;
  > button {
    width: calc(25% - 10px);
    box-shadow: none;
    border-radius: 10px;
    border: 1px solid #CECECE;
    margin-bottom: 8px;
  }
`;
