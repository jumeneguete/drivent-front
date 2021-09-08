import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import Button from "../Form/Button";
import dayjs from "dayjs";
import UpdateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt-br";
import Loader from "react-loader-spinner";
dayjs.extend(UpdateLocale);
dayjs.updateLocale("pt-br", {
  weekdays: [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
  ]
});

export default function DaysList() {
  const { event } = useApi();
  const [ days, setDays ] = useState([]);
  const [ loading, setIsLoading] = useState(true);

  useEffect(() => {
    updateDays();
  }, []);

  function updateDays() {
    event.getEventDays()
      .then(({ data }) => {
        setDays(data.map(day => { 
          return { ...day, isSelected: false };
        }));
      })
      .catch((err) => {
        //eslint-disable-next-line no-console
        console.error(err);
        setIsLoading(false);
      });
  } 

  function handleSelection(e) {
    const newArray = days.map(d => {
      if(d.id.toString() === e.currentTarget.id) {
        return { ...d, isSelected: d.isSelected ? false : true };
      }
      else return { ...d, isSelected: false };
    });
    setDays(newArray);
  }

  return(
    <Container>
      {
        !!days.find(d => d.isSelected) ||
        <Title variant="h6">Primeiro, filtre pelo dia do evento</Title>
      }
      <ButtonsWrapper>
        {
          !!days.length ?
            days.map(d => {
              return(
                <StyledButton 
                  key={d.id}
                  id={d.id}
                  variant="contained"
                  onClick={handleSelection}
                  selected={d.isSelected}
                >
                  {dayjs(d.day).locale("pt-br").format("dddd, DD/MM")}
                </StyledButton>
              );
            })
            :
            loading && <Loader width="50" height="50" type="ThreeDots" color="#FA4098"/>
        }
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
  background-color: ${props => props.selected ? "#FFD37D" : "none"}!important;
`;
