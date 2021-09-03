import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "../Form/Button";
import EachHotel from "./EachHotel";

export default function Accommodation() {
  const hotelsAvailables = [
    {
      name: "Driven Resort",
      acomodationsType: ["Single", "Double"],
      beds: 103,
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
    },
    {
      name: "Driven Palace",
      acomodationsType: ["Single", "Double", "Triple"],
      beds: 25,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f7/8b/38/exterior.jpg?w=900&h=-1&s=1",
    },
    {
      name: "Driven World",
      acomodationsType: ["Single", "Double"],
      beds: 2,
      image:
        "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg",
    },
  ];

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>
      <StyledTypography variant="h6">
        Primeiro, escolha seu hotel
      </StyledTypography>
      <HotelContainer>
        {hotelsAvailables.map((n) => (
          <EachHotel
            name={n.name}
            accommodationType={n.acomodationsType}
            beds={n.beds}
            image={n.image}
          />
        ))}
      </HotelContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const HotelContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
    box-shadow: none;
    background-color: #f1f1f1;
    margin-right: 19px;
  }

  img{
    width: 168px!important;
    height: 109px;
  }
`;
