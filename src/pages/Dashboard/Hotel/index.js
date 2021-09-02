import Reject from "./Reject";
import styled from "styled-components";

export default function Hotel() {
  const hasPaid = false;
  const shouldReject = !hasPaid;
  return (
    <>
      <Header>Escolha de hotel e quarto</Header>
      {shouldReject ? <Reject /> : <p>em breve</p>}
    </>
  );
}

const Header = styled.header`
  color: black;
  font-family: "Roboto";
  font-size: 34px;
  line-height: 39.84px;
`;
