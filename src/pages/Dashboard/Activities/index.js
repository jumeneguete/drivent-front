import { Typography } from "@material-ui/core";
import styled from "styled-components";
import DaysList from "../../../components/Activities/DaysList";

export default function Activities() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <DaysList />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
