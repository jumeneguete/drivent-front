import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export default function NoPaymentActivities() {
  return (
    <>
      <MessageContainer>
        <Message> 
        Você precisa ter confirmado pagamento antes <br/>
        de fazer a escolha de atividades 
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
