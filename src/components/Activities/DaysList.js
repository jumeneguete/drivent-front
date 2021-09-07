import { Typography } from "@material-ui/core";
import styled from "styled-components";
import Button from "../Form/Button";

export default function DaysList() {
  return(
    <Container>
      <Title variant="h6">Primeiro, filtre pelo dia do evento</Title>
      <ButtonsWrapper>
        <StyledButton variant="contained">Sexta, 22/10</StyledButton>
        <StyledButton variant="contained">Sábado, 23/10</StyledButton>
        <StyledButton variant="contained">Domingo, 24/10</StyledButton>
      </ButtonsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 17px;
  flex-wrap: wrap;
`;

const Title = styled(Typography)`
  color: #8E8E8E!important;
`;

const StyledButton = styled(Button)`
  text-transform: capitalize!important;
  padding: 0 10px!important;
  min-height: 37px;
  width: 131px;
  margin: 0!important;
`;
