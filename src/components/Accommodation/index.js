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
    },
    {
      name: "Driven Palace",
      acomodationsType: ["Single", "Double", "Triple"],
      beds: 25,
    },
    {
      name: "Driven World",
      acomodationsType: ["Single", "Double"],
      beds: 2,
    },
  ];

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>
      <HotelContainer>
        {hotelsAvailables.map((n) => (
          <EachHotel
            name={n.name}
            accommodationType={n.acomodationsType}
            beds={n.beds}
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
  }
`;
