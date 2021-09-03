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

  const noPayment = hotels.error === "Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem";

  return (
    <Wrapper>
      {noPayment ? <NoPaymentMessage /> : "em breve"}
    </Wrapper>
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
