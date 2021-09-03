import styled from "styled-components";

export default function EachHotel({
  name,
  accommodationType,
  beds,
  image
}) {
  return (
    <EachHotelContainer>
      <img src={image} />
      <h6>{name}</h6>
      <p>
        <strong>Tipos de acomodação: </strong>
        <br />
        {accommodationType.length === 1
          ? accommodationType[0]
          : accommodationType.length === 2
            ? accommodationType[0] + " e " + accommodationType[1]
            : accommodationType[0] +
            ", " +
            accommodationType[1] +
            " e " +
            accommodationType[2]}
      </p>
      <p>
        <strong>Vagas disponíveis: </strong>
        <br />
        {beds}
      </p>
    </EachHotelContainer>
  );
}

const EachHotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  text-transform: initial;

  > h6 {
    font-size: 20px;
    margin: 10px 0;
  }
  >p {
    font-size: 12px;
    line-height: 14px;
    text-align: start;
    margin-bottom: 14px;
  }
  >img {
    width: 168px !important;
    height: 109px;
    margin: auto;
    border-radius: 5px;
  }
`;
