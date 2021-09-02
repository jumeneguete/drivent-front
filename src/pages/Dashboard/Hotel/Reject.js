import styled from "styled-components";

export default function Reject() {
  return (
    <Wrapper>
      <p>
        Você precisa ter confirmado pagamento antes
        <br />
        de fazer a escolha de hospedagem
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);
  
  p{
    font-family: "Roboto";
    text-align: center;
    color: #8E8E8E;
    line-height: 23.44px;
    font-size: 20px;
  }
`;
