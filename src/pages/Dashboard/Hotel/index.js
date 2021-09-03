import Reject from "./Reject";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";

class Hotels {
  constructor(error, hotels) {
    this.error = error;
    this.hotels = hotels;
  }
}

export default function Hotel() {
  const api = useApi();
  const [hotels, setHotels] = useState(new Hotels(null, []));

  useEffect(() => {
    api.hotel
      .getHotelsByUser()
      .then(({ data: hotels }) => {
        setHotels(new Hotels(null, hotels));
      })
      .catch((err) => {
        const message = err.response.data.message;
        console.log(message);
        setHotels(new Hotels(message, []));
      });
  }, []);

  return (
    <>
      <Header>Escolha de hotel e quarto</Header>
      <Reject {...{ hotels }} />
    </>
  );
}

const Header = styled.header`
  color: black;
  font-family: "Roboto";
  font-size: 34px;
  line-height: 39.84px;
`;
