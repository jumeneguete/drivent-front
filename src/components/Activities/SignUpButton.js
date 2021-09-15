import styled from "styled-components";
import { BiLogIn } from "react-icons/bi";

export default function SignUpButton({ vacancyCount, postEnrollment }) {
  return (
    <SignUpWrapper onClick={postEnrollment}>
      <BiLogIn />
      <p>{vacancyCount} vagas</p>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.button`
  color: #078632;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 26px;
  cursor: pointer;
  background: none;
  padding-left: 12px;

  p {
    font-size: 9px;
    text-align: center;
  }
`;
