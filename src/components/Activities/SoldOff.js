import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function SoldOff() {
  return (
    <SoldOffWrapper>
      <AiOutlineCloseCircle />
      <p>Esgotado</p>
    </SoldOffWrapper>
  );
}

const SoldOffWrapper = styled.button`
  color: #cc6666;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 26px;
  background: none;
  padding-left: 16px;

  p {
    font-size: 9px;
    text-align: center;
  }
`;
