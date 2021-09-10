import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function SoldOff() {
  return (
    <SoldOffWrapper>
      <AiOutlineCloseCircle />
      <p>esgotado</p>
    </SoldOffWrapper>
  );
}

const SoldOffWrapper = styled.button`
  color: #cc6666;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 26px;

  p {
    font-size: 9px;
    text-align: center;
    padding-left: 5px;
  }
`;
