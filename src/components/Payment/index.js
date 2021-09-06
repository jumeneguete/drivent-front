import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OptionsField from "./OptionsField";
import Button from "../Form/Button";
import Footer from "./Footer";
import { hotelOptions, tickets } from "./options";
import { toast } from "react-toastify";
import validateOptions from "./validateOptions";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router";

export default function Payment({ enrollmentId }) {
  const { payment } = useApi();
  const history = useHistory();
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
    const validation = validateOptions(optionsChosen.ticket, optionsChosen.hotel);
    if(validation) {
      toast(validation);
      return;
    }
    const body = createBody();
    payment.postBookTicket(body)
      .then(({ data }) => {
        history.push("/dashboard/payment/confirm", { bookInfo: data });
      })
      .catch(err => {
      //eslint-disable-next-line no-console
        console.error(err);
        history.push("/dashboard/payment/confirm", { bookInfo: {
          "id": 1,
          "isPaid": false,
          "enrollmentId": 1,
          "ticketOption": {
            "type": "presencial",
            "price": 25000
          },
          "hotelOption": {
            "name": "com hotel",
            "price": 35000
          }
        } });
        // history.push({ pathname: "/dashboard/payment/confirm", state: { bookInfo: ["aaaa", 1234, { Test: "Test" }] } });
        if(err.response) {
          const details = err.response.data?.details;
          
          if(Array.isArray(details))
            for(const detail of details) toast(detail);
          else
            toast("Erro inesperado. Por favor, tente novamente mais tarde.");
        } else {
          toast("Não foi possível conectar ao servidor");
        }
      });
  }

  function createBody() {
    return {
      type: optionsChosen.ticket.modality.toLowerCase(),
      hotel: optionsChosen.hotel?.modality === "Com Hotel",
      enrollmentId
    };
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
