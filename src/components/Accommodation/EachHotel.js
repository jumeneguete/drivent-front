import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "../Form/Button";

export default function EachHotel({ name, accommodationType, beds, image }) {
  return (
    <Button>
      <img src={image} />
      <h6>{name}</h6>
      <p>Vagas disponíveis: {beds}</p>
    </Button>
  );
}
