import { useEffect, useState } from "react";
import styled from "styled-components";
import OptionsField from "./OptionsField";
import Button from "../Form/Button";
import Footer from "./Footer";
import { toast } from "react-toastify";
import validateOptions from "./validateOptions";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

export default function Payment({ enrollmentId }) {
  const { booking } = useApi();
  const history = useHistory();
  const [ticket, setTicket] = useState(null);
  const [hotelOption, setHotelOption] = useState(null);
  const [optionsChosen, setOptionChosen] = useState({
    ticket: undefined,
    hotel: undefined
  });

  useEffect(() => {
    ticket || updateTicketOptions();
    hotelOption || updateHotelOptions();
    ticket && hotelOption && updateChosenOptions();
  }, [ticket, hotelOption]);

  function updateTicketOptions() {
    booking.getTicketOptions().then(({ data }) => setTicket(data.map(t => {
      return {
        modality: t.type,
        price: t.price/100,
        isSelected: false
      };
    }).reverse()));
  }

  function updateHotelOptions() {
    booking.getHotelOptions().then(({ data }) => setHotelOption(data.map(h => {
      return {
        modality: h.name,
        price: h.price/100,
        isSelected: false
      };
    })));
  }

  function onSubmit() {
    const validation = validateOptions(optionsChosen.ticket, optionsChosen.hotel);
    if(validation) {
      toast(validation);
      return;
    }
    findPreviousBooking();
  }

  async function findPreviousBooking() {
    try{
      await booking.getBookTicketByEnrollmentId(enrollmentId);
      updateBooking();
    } catch(e) {
      //eslint-disable-next-line no-console
      console.error(e);
      createNewBooking();
    }
  }

  function updateBooking() {
    const body = createBody();

    booking.updateBookTicket(body, enrollmentId)
      .then(({ data }) => {
        history.push("/dashboard/payment/confirm", { bookInfo: data });
      })
      .catch(err => handleServerError(err));
  }

  function createNewBooking() {
    const body = createBody();

    booking.postBookTicket(body)
      .then(({ data }) => {
        history.push("/dashboard/payment/confirm", { bookInfo: data });
      })
      .catch(err => handleServerError(err));
  }

  function handleServerError(err) {
    //eslint-disable-next-line no-console
    console.error(err);
      
    if(err.response) {
      const details = err.response.data?.details;
    
      if(Array.isArray(details))
        for(const detail of details) toast(detail);
      else
        toast("Erro inesperado. Por favor, tente novamente mais tarde.");
    } else {
      toast("Não foi possível conectar ao servidor");
    }
  }

  function createBody() {
    return {
      type: optionsChosen.ticket.modality,
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

  if(!(ticket && hotelOption)) return <Loader color="#FA4098" height={50} width={50} type="ThreeDots"/>;

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
