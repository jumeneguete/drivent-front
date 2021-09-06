import { useLocation } from "react-router-dom";
import BookSummary from "./BookSummary";
import Cards from "react-credit-cards";
import { useState } from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/date-fns";
import Button from "../Form/Button";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";

export default function ConfirmPayment() {
  const bookInfo = useLocation().state.bookInfo;
  const { payment } = useApi();
  const [cardInfo, setCardInfo] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  
  console.log(cardInfo, cardInfo.name.length);

  function handleChange({ target }) {
    if(target.name === "number")
      cardInfo.number = target.value.split("").filter(l => l !== ".").join("");
    else if(target.name === "name")
      cardInfo.name = target.value;
    else if(target.name === "cvc")
      cardInfo.cvc = target.value;
    setCardInfo({ ...cardInfo });
  }

  function handleDateChange(newDate) {
    newDate ? cardInfo.expiry = dayjs(newDate).format("MM/YY") : cardInfo.expiry = "";
    setCardInfo({ ...cardInfo });
  }

  function handleFocus({ target }) {
    if(target === null) {
      cardInfo.focus = "expiry";
    } else {
      cardInfo.focus = target.name;
    }
    setCardInfo({ ...cardInfo });
  }

  function handleBlur() {
    cardInfo.focus = "";
    setCardInfo({ ...cardInfo });
  }

  function handleSubmit() {
    const validation = validateData(cardInfo);
    if(validation) {
      toast(validation);
      return;
    }
    payment.postConfirmPayment(); // ARRUMAR A PARTIR DAQUI <==
  }

  function validateData(body) {
    if(!(body.number && body.number.length === 16 && !body.number.includes("_"))) {
      return "Número de cartão inválido";
    }
    else if(!(body.name && /^[a-zA-Z ]+$/.test(body.name) && body.name.length <= 40)) {
      return "Nome inválido";
    }
    else if(!(body.expiry && dayjs(body.expiry, "MM/YY").$d > Date.now())) {
      return "Data de vencimento inválida";
    }
    else if(!(body.cvc && body.cvc.length >= 3)) {
      return "CVC inválido";
    }
    return false;
  }

  return (
    <Container>
      <StyledTypography variant="h6">Ingresso escolhido</StyledTypography>
      <BookSummary 
        bookInfo={{
          ticket: bookInfo.ticketOption.type, 
          hotel: bookInfo.hotelOption.name,
          price: bookInfo.ticketOption.price + bookInfo.hotelOption.price
        }}
      />
      <StyledTypography variant="h6">Pagamento</StyledTypography>
      <CardContainer>
        <Cards
          cvc={cardInfo.cvc}
          expiry={cardInfo.expiry}
          focused={cardInfo.focus}
          name={cardInfo.name}
          number={cardInfo.number}
        />
        <Form>
          <InputMask 
            mask="9999.9999.9999.9999"
            value={cardInfo.number}
            onChange={handleChange}
            onFocus={handleFocus}
          >
            {(inputProps) => 
              <TextField
                {...inputProps}  
                variant="outlined"
                label="Número do cartão"
                error={false}
                helperText="Ex.: 49..., 51..., 36..., 37..."
                size="small"
                name="number"
                value={cardInfo.number}
              />
            }
          </InputMask>
          <TextField  
            variant="outlined"
            label="Nome"
            error={false}
            size="small"
            name="name"
            inputProps={{ maxLength: 40 }}
            value={cardInfo.name}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <Division>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                name="validThru"
                format="MM-yy"
                label="Data de validade"
                inputVariant="outlined"
                clearable
                error={false}
                helperText={null}
                views={["month", "year"]}
                value={cardInfo.expiry && dayjs(cardInfo.expiry, "MM-YY").toString()}
                onChange={handleDateChange}
                size="small"
                onFocus={handleFocus}
                className="validThru"
              />
            </MuiPickersUtilsProvider>
            <TextField  
              name="cvc"
              variant="outlined"
              label="CVC"
              error={false}
              size="small"
              value={cardInfo.cvc}
              inputProps={{ maxLength: 4 }}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Division>
        </Form>
      </CardContainer>
      <CustomButton onClick={handleSubmit}>Finalizar pagamento</CustomButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  width: fit-content;
  gap: 30px;
  margin: 17px 0 70px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const Division = styled.div`
  display: flex;
  gap: 20px;

  &>.validThru{
    width: 100%;
  }
`;

const CustomButton = styled(Button)`
  margin-top: 20px;
  width: fit-content;
`;

const StyledTypography = styled(Typography)`
  color: #8E8E8E;
`;
