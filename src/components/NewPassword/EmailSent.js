import styled from "styled-components";
import { Row, Label } from "../Auth";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../Form/Button";
import { useHistory } from "react-router";

export default function EmailSent() {
  const history = useHistory();

  return (
    <Row>
      <Label>Recuperação de senha</Label>
      <Message>
        <FaCheckCircle className="icon"/>
         E-mail enviado!
      </Message>
          
      <Button color="primary" fullWidth onClick={() => history.push("/sign-in")}>Retornar ao login</Button>
      
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
