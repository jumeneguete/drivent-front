import styled from "styled-components";

export default function BookSummary({ bookInfo }) {
  if(!bookInfo) return null;
  
  function transformToCurrency(number = 0) {
    return (number).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function capitalizeFirstLetter(string) {
    if(!string || typeof string !== "string") return null;
    
    const array = string.split(" ");
    
    const newArray = array.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    
    return newArray.join(" ");
  }

  return (
    <Container>
      <Summary>
        {capitalizeFirstLetter(bookInfo.ticket)} 
        + 
        {capitalizeFirstLetter(bookInfo.hotel)}
      </Summary>
      <TotalPrice>{transformToCurrency(bookInfo.price/100)}</TotalPrice>
    </Container>
  );
}

const Container = styled.div`
  background-color: #FFEED2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: fit-content;
  gap: 8px;
  padding: 30px 50px;
`;

const Summary = styled.span`
  color: #454545;
`;

const TotalPrice = styled.span`
  color: #898989;
`;
