import styled from "styled-components";
import { Row, Label } from "../Auth";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../Form/Button";
import { useHistory } from "react-router";

export default function Finalization({ label, text }) {
  const history = useHistory();

  return (
    <Row>
      <Label>{label}</Label>
      <Message>
        <FaCheckCircle className="icon"/>
        {text}
      </Message>
      <StyledButton color="primary" fullWidth onClick={() => history.push("/sign-in")}>Retornar ao login</StyledButton>
      
    </Row>
  );
}

const Message = styled.h3`
  color: gray;
  font-size: 22px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 60px 0;

  &>.icon {
    color: green;
    font-size: 40px;
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 50px;
`;
