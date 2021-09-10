import styled from "styled-components";

export default function Reject({ hotels }) {
  function NoPaymentMessage() {
    return (
      <p>
        Você precisa ter confirmado pagamento antes
        <br />
        de fazer a escolha de hospedagem
      </p>
    );
  }

  function NoHotelOptionMessage() {
    return (
      <p>
        Sua modalidade de ingresso não inclui hospedagem
        <br />
        Prossiga para a escolha de atividades
      </p>
    );
  }

  const errorCode = hotels?.error?.response?.data?.driventCode;
  const noPayment = errorCode === "1";
  const noHotelOption = errorCode === "2";

  return (
    <>
      <Wrapper avalilable={noPayment}>
        {noPayment ? (
          <NoPaymentMessage />
        ) : noHotelOption ? (
          <NoHotelOptionMessage />
        ) : (
          "Entre em contato com a organização do evento"
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);

  p {
    font-family: "Roboto";
    text-align: center;
    color: #8e8e8e;
    line-height: 23.44px;
    font-size: 20px;
  }
`;
