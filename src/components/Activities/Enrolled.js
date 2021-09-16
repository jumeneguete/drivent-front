import styled from "styled-components";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Enrolled() {
  return (
    <EnrolledWrapper>
      <FaRegCheckCircle />
      <p>Inscrito</p>
    </EnrolledWrapper>
  );
}

const EnrolledWrapper = styled.button`
  color: #078632;
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
