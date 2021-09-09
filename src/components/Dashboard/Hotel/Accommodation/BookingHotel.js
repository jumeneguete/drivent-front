import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "../../../Form/Button";

export default function BookingHotel({ hotel }) {
  const { id, name, imgUrl, rooms } = hotel;
  const { number, bedCount, bookingRoom } = rooms[0];

  let accomodationType;
  bedCount === 1
    ? (accomodationType = "(Single)")
    : bedCount === 2
      ? (accomodationType = "(Double)")
      : (accomodationType = "(Triple)");
  return (
    <BookingHotelContainer>
      <StyledTypography variant="h6">
        Você já escolheu seu quarto:
      </StyledTypography>
      <StyledHotelButton disabled>
        <div>
          <img src={imgUrl} alt={name} />
          <Typography variant="h6">{name}</Typography>
          <p>
            <strong>Quarto reservado</strong> <br />{" "}
            {number + " " + accomodationType}
          </p>
          <p>
            <strong>Pessoas no seu quarto</strong> <br />
            {bookingRoom.length === 1
              ? "Somente você"
              : `Você e mais ${bookingRoom.length - 1} pessoas`
            }
          </p>
        </div>
      </StyledHotelButton>
      <StyledChangeRoomButton onClick={() => alert("em breve")}>
        Trocar de quarto
      </StyledChangeRoomButton>
    </BookingHotelContainer>
  );
}

const BookingHotelContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledTypography = styled(Typography)`
  color: #8e8e8e;
  margin-top: 36px !important;
`;

const StyledHotelButton = styled(Button)`
  padding: 16px 14px !important;
  background-color: #ffeed2 !important;
  div {
    text-align: start;
    text-transform: capitalize !important;
    color: #343434;
  }
  p {
    line-height: 16px;
    margin: 14px 0 4px 0;
    text-transform: initial !important;
  }
`;

const StyledChangeRoomButton = styled(Button)`
  margin-top: 38px !important;
`;
