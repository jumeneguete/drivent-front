import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "../../../Form/Button";

export default function BookingHotel({ booking }) {
  const { id, bedCount, bookingRoom, hotel, number } = booking;
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
          <img src={hotel.imgUrl} alt={hotel.name} />
          <Typography variant="h6">{hotel.name}</Typography>
          <p>
            Quarto reservado <br /> {number + " " + accomodationType}
          </p>
          <p>
            Pessoas no seu quarto <br /> Você{" "}
            {bookingRoom.length < bedCount - 1
              ? `e mais ${bookingRoom.length - bedCount - 1}`
              : null}
          </p>
        </div>
      </StyledHotelButton>
      <StyledChangeRoomButton>Trocar de quarto</StyledChangeRoomButton>
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
`;

const StyledChangeRoomButton = styled(Button)`
  margin-top: 38px !important;
`;
