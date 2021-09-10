import styled from "styled-components";

export default function Footer({ children }) {
  return (
    <>
      <MessageContainer>
        <Message>
          Você precisa completar sua inscrição antes <br/>
          de prosseguir pra escolha de ingresso
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
