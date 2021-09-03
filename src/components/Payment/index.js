import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import styled from "styled-components";
import OptionsField from "./OptionsField";
import Button from "../Form/Button";
import Footer from "./Footer";

export default function Payment() {
  const [modality, setModality] = useState(null);
  const [hasHotel, setHasHotel] = useState(null);

  useEffect(() => {
    if(modality === null && hasHotel !== null) 
      setHasHotel(null);
  }, [modality]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <OptionsField 
        title="Primeiro, escolha sua modalidade de ingresso" 
        textOptionOne="Presencial"
        valueOptionOne={250}
        textOptionTwo="Online"
        valueOptionTwo={100}
        onClick={setModality}
        value={modality}
      />
      {
        modality && modality !== "Online" ?
          <OptionsField
            title="Ótimo! Agora escolha sua modalidade de hospedagem" 
            textOptionOne="Sem Hotel"
            valueOptionOne={0}
            textOptionTwo="Com Hotel"
            valueOptionTwo={350}
            onClick={setHasHotel}
            value={hasHotel}
          />
          :
          modality && <Footer>
            <Title>Fechado! O total ficou em <Bold>R$ 100</Bold>. Agora é só confirmar:</Title>
            <BookingButton>RESERVAR INGRESSO</BookingButton>
          </Footer>
      }
      {
        modality && modality !== "Online" && hasHotel &&
        <Footer>
          <Title>Fechado! O total ficou em <Bold>R$ 600</Bold>. Agora é só confirmar:</Title>
          <BookingButton>RESERVAR INGRESSO</BookingButton>
        </Footer>
      }
      
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Title = styled.span`
  font-size: 20px;
  color: #8E8E8E;
`;

const BookingButton = styled(Button)`
  width: fit-content;
`;

const Bold = styled.span`
  font-weight: 700;
`;
