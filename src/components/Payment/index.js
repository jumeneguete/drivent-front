import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OptionsField from "./OptionsField2";
import Button from "../Form/Button";
import Footer from "./Footer";
import { hotelOptions, tickets } from "./options";

export default function Payment() {
  const [ticket, setTicket] = useState(tickets);
  const [hotelOption, setHotelOption] = useState(hotelOptions);
  const [optionsChosen, setOptionChosen] = useState({
    ticket: undefined,
    hotel: undefined
  });

  useEffect(() => {
    updateChosenOptions();
  }, [ticket, hotelOption]);

  function onSubmit() {
    console.log(optionsChosen);
  }

  function updateChosenOptions() {
    const newTicket = ticket.find(t => t.isSelected);
    let newHotelOption;
    if(newTicket !== optionsChosen.ticket) {
      newHotelOption = undefined;
      hotelOption.forEach(h => h.isSelected = false);
    } else {
      newHotelOption = hotelOption.find(h => h.isSelected);
    }

    setOptionChosen({
      ticket: newTicket,
      hotel: newHotelOption
    });
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <OptionsField 
        title="Primeiro, escolha sua modalidade de ingresso" 
        options={ticket}
        setState={setTicket}

      />
      {
        optionsChosen.ticket && optionsChosen.ticket.modality !== "Online" ?
          <OptionsField
            title="Ótimo! Agora escolha sua modalidade de hospedagem" 
            options={hotelOption}
            setState={setHotelOption}
          />
          :
          optionsChosen.ticket && 
          <Footer>
            <Title>Fechado! O total ficou em <Bold>R$ {optionsChosen.ticket.price}</Bold>. Agora é só confirmar:</Title>
            <BookingButton onClick={onSubmit}>RESERVAR INGRESSO</BookingButton>
          </Footer>
      }
      {
        optionsChosen.ticket && optionsChosen.ticket.modality !== "Online" && optionsChosen.hotel &&
        <Footer>
          <Title>
            Fechado! O total ficou em 
            <Bold>R$ {optionsChosen.hotel.price + optionsChosen.ticket.price}</Bold>. 
            Agora é só confirmar:
          </Title>
          <BookingButton onClick={onSubmit}>RESERVAR INGRESSO</BookingButton>
        </Footer>
      }
      
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Title = styled.span`
  font-size: 20px;
  color: #8E8E8E;
`;

const BookingButton = styled(Button)`
  width: fit-content;
`;

const Bold = styled.span`
  font-weight: 700;
`;
