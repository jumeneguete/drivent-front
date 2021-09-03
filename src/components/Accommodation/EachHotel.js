import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "../Form/Button";

export default function EachHotel({ name, accommodationType, beds }) {
  return <Button>{name}</Button>;
}
