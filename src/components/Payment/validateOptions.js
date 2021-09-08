export default function validateOptions(ticket, hotel) {
  if(ticket?.modality && !(ticket.modality !== "Presencial" || ticket.modality !== "Online")) {
    return "Modalidade de ingresso inválida!";
  }
  if(hotel?.modality && !(hotel.modality !== "Sem Hotel" || hotel.modality !== "Com Hotel")) {
    return "Modalidade de hotel inválida";
  }
  return false;
}
