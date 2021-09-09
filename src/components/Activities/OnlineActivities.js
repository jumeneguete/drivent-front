import styled from "styled-components";

export default function OnlineActivities() {
  return (
    <>
      <MessageContainer>
        <Message> 
        Sua modalidade de ingresso não necessita escolher <br />
        atividade. Você terá acesso a todas as atividades.
        </Message>
      </MessageContainer>
    </>
  );
}

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
