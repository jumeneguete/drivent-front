import { useEffect } from "react";
import Reject from "./Reject";
import styled from "styled-components";

export default function Hotel() {
  return (
    <>
      <Header>Escolha de hotel e quarto</Header>
      <Reject />
    </>
  );
}

const Header = styled.header`
  color: black;
  font-family: "Roboto";
  font-size: 34px;
  line-height: 39.84px;
`;
