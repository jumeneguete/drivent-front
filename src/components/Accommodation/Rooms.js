import styled from "styled-components";
import { BsPerson, BsFillPersonFill } from "react-icons/bs";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";

export default function Rooms({ roomInformation, setChosenRoom, chosenRoom }) {
  const { id, name, beds, guests } = roomInformation;
  const [bedsAvailables, setBedsAvailables] = useState([]);

  useEffect(() => {
    let bed = [];
    for (let i = 0; i < beds; i++) {
      if (guests[i]) {
        bed.push(guests[i]);
      } else {
        bed.push(null);
      }
    }
    return setBedsAvailables(bed);
  }, []);

  return (
    <RoomContainer
      disabled={!bedsAvailables.includes(null)}
      onClick={() => {
        setChosenRoom(id);
      }}
      chosen={id === chosenRoom}
    >
      <StyledTypography variant="h6">{name}</StyledTypography>
      <span>
        {bedsAvailables.map((n, i) =>
          n === null ? (
            <BsPerson style={{ fontSize: "20px" }} key={i} />
          ) : (
            <BsFillPersonFill style={{ fontSize: "20px" }} key={i} />
          )
        )}
      </span>
    </RoomContainer>
  );
}

const RoomContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 11px 12px 11px !important;
  background-color: ${(props) => (props.chosen ? "#FFEED2" : null)}!important;
  background-color: ${(props) => (!props.disabled ? "#FFF" : "#E9E9E9")};
  cursor: ${(props) => (!props.disabled ? "pointer" : null)};
`;

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
  font-size: 16px !important;
  color: #454545;
`;
