import styled from "styled-components";
import { BsPerson, BsFillPersonFill } from "react-icons/bs";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";

export default function Rooms({ roomInformation }) {
  const { name, beds, guests } = roomInformation;
  const [bedsAvailables, setBedsAvailables] = useState([]);

  useEffect(() => {
    let bed = [];
    for (let i = 0; i < beds; i++) {
      if (guests[i]) {
        bed.push(false);
      } else {
        bed.push(true);
      }
    }
    return setBedsAvailables(bed);
  }, []);

  return (
    <RoomContainer disabled={!bedsAvailables.includes(true)}>
      <StyledTypography variant="h6">{name}</StyledTypography>
      <BedContainer>
        {bedsAvailables.map((n) =>
          n ? (
            <BsPerson style={{ fontSize: "20px" }} />
          ) : (
            <BsFillPersonFill style={{ fontSize: "20px" }} />
          )
        )}
      </BedContainer>
    </RoomContainer>
  );
}

const RoomContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 11px 12px 11px !important;
  background-color: ${(props) =>
    !props.disabled ? "#FFF" : "#E9E9E9"}!important;
  cursor: ${(props) => (!props.disabled ? "pointer" : null)};
`;

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
  font-size: 16px !important;
  color: #454545;
`;

const BedContainer = styled.span``;
