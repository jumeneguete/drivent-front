import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function Footer({ children }) {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <MessageContainer>
        <Message>
          Você precisa completar sua inscrição antes <br/>
          de prosseguir pra escolha de ingresso
        </Message>
      </MessageContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const MessageContainer = styled.div`
  width: 100%;
  min-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h2`
  color: #8E8E8E;
  font-size: 20px;
  text-align: center;
  line-height: 25px;
`;
