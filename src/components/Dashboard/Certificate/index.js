import styled from "styled-components";
import Reject from "./reject";

export default function CertificateHolder({ certificateState }) {
  return (
    <CertificateContainer>
      {certificateState.error ? (
        <Reject error={certificateState.error} />
      ) : (
        "Em breve"
      )}
    </CertificateContainer>
  );
}

const CertificateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 80px);

  p {
    font-family: "Roboto";
    text-align: center;
    color: #8e8e8e;
    line-height: 23.44px;
    font-size: 20px;
  }
`;
