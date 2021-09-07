import styled from "styled-components";
import { BsPerson, BsFillPersonFill } from "react-icons/bs";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../../contexts/UserContext";

export default function Rooms({
  roomInformation: room,
  setChosenRoom,
  chosenRoom,
}) {
  const [bedsAvailable, setBedsAvailable] = useState([]);

  const user = useContext(UserContext);
  const userId = user.userData.user.id;
  //   id: 2,
  //   hotelId: 1,
  //   number: 102,
  //   bedCount: 1,
  //   guests: [],
  // },

  // POST "/booking-room"
  // body: {roomId: #}
  // header: auth stuff

  console.log(room);
  useEffect(() => {
    let beds = [];
    for (let i = 0; i < room.bedCount; i++) {
      if (room.guests[i] === userId) {
        beds.push(true);
      } else if (room.guests[i]) {
        beds.push(false);
      } else {
        beds.push(null);
      }
    }
    // const userIsIn = beds.indexOf(true);
    // if (userIsIn !== -1) {
    //   const last = beds[beds.length - 1];
    //   beds[beds.length - 1] = true;
    //   beds[userIsIn] = last;
    // }
    setBedsAvailable(beds);
  }, [chosenRoom]);

  function fillBeds() {
    if (room.id === chosenRoom) {
      return bedsAvailable.map((bed, i) =>
        i === bedsAvailable.length - 1 ? (
          <BsFillPersonFill
            style={{ fontSize: "20px", color: "#FF4791" }}
            key={i}
          />
        ) : bed === null ? (
          <BsPerson style={{ fontSize: "20px" }} key={i} />
        ) : (
          <BsFillPersonFill style={{ fontSize: "20px" }} key={i} />
        )
      );
    } else {
      return bedsAvailable.map((bed, i) =>
        bed === null ? (
          <BsPerson style={{ fontSize: "20px" }} key={i} />
        ) : (
          <BsFillPersonFill style={{ fontSize: "20px" }} key={i} />
        )
      );
    }
  }

  return (
    <RoomContainer
      disabled={!bedsAvailable.includes(null)}
      onClick={() => {
        setChosenRoom(room.id);
      }}
      isChosen={room.id === chosenRoom}
    >
      <StyledTypography variant="h6">{room.number}</StyledTypography>
      <span>{fillBeds()}</span>
    </RoomContainer>
  );
}

const RoomContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 11px 12px 11px !important;
  background-color: ${(props) => (props.isChosen ? "#FFEED2" : null)}!important;
  background-color: ${(props) => (!props.disabled ? "#FFF" : "#E9E9E9")};
  cursor: ${(props) => (!props.disabled ? "pointer" : null)};
`;

const StyledTypography = styled(Typography)`
  font-weight: bold !important;
  font-size: 16px !important;
  color: #454545;
`;
