import styled from "styled-components";

export default function Footer({ children }) {
  return (
    <FooterContainer>
      {children}
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  gap: 10px;
`;
