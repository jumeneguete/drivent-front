import styled from "styled-components";

export default function Hotel({ hotelInformation }) {
  const { name, imgUrl, accommodationsType, beds } = hotelInformation;
  return (
    <HotelContainer>
      <img src={imgUrl} alt={name} />
      <h6>{name}</h6>
      <p>
        <strong>Tipos de acomodação: </strong>
        <br />
        {accommodationsType.length === 1
          ? accommodationsType[0]
          : accommodationsType.length === 2
            ? accommodationsType[0] + " e " + accommodationsType[1]
            : accommodationsType[0] +
            ", " +
            accommodationsType[1] +
            " e " +
            accommodationsType[2]}
      </p>
      <p>
        <strong>Vagas disponíveis: </strong>
        <br />
        {beds}
      </p>
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  text-transform: initial;

  > h6 {
    font-size: 20px;
    margin: 10px 0;
  }
  > p {
    font-size: 12px;
    line-height: 14px;
    text-align: start;
    margin-bottom: 14px;
  }
  > img {
    width: 168px !important;
    height: 109px;
    margin: auto;
    border-radius: 5px;
  }
`;
