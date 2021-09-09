import Loader from "react-loader-spinner";
import styled from "styled-components";

export default function Loading({ message = "" }) {
  return(
    <LoaderContainer>
      <Loader color="#FA4098" height={50} width={50} type="Oval"/>
      <Message>{message}</Message>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Message = styled.span`
  font-size: 24px;
  color: #FA4098;
`;
