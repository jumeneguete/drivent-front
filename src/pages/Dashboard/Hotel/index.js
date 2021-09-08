import Reject from "../../../components/Dashboard/Hotel/Accommodation/Reject";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

import Accommodation from "../../../components/Dashboard/Hotel/Accommodation";

class Hotels {
  constructor(error, hotels) {
    this.error = error;
    this.hotels = hotels;
  }
}

export default function Hotel() {
  const api = useApi();
  const [hotels, setHotels] = useState(new Hotels(true, []));
  useEffect(() => {
    api.hotel
      .getHotelsByUser()
      .then(({ data: hotels }) => {
        setHotels(new Hotels(null, hotels));
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);
        
        const details = error.response.data.details;

        if (error.response) {
          for (const detail of details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível conectar ao servidor!");
        }

        setHotels(new Hotels(details.join(" "), []));
      });
  }, []);

  return (
    <>
      <Header>Escolha de hotel e quarto</Header>
      {hotels.error? <Reject {...{ hotels }} />: <Accommodation hotels={hotels.hotels}/>}      
    </>
  );
}

const Header = styled.header`
  color: black;
  font-family: "Roboto";
  font-size: 34px;
  line-height: 39.84px;
`;
